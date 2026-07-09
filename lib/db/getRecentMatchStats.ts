import { SupabaseClient } from "@supabase/supabase-js";
import { MatchRow } from "@/types/getRecentTeamStatsForMatch";
import { getSeasonIdsForLeague } from "@/lib/db/getSeasonIdsForLeague";

type MatchSide = "home" | "away";

export async function getRecentMatchesBySide(
  supabase: SupabaseClient,
  teamId: number,
  matchDate: string,
  seasonId: number,
  side: MatchSide,
  limit = 8,
): Promise<MatchRow[]> {
  const seasonIds = await getSeasonIdsForLeague(supabase, seasonId);
  const teamColumn = side === "home" ? "home_team_id" : "away_team_id";

  const { data: leagueMatches, error: leagueError } = await supabase
    .from("Matches")
    .select(
      "id, season_id, kickoff, home_team_id, away_team_id, home_goals, away_goals, is_finished",
    )
    .eq(teamColumn, teamId)
    .in("season_id", seasonIds)
    .lt("kickoff", matchDate)
    .eq("is_finished", true)
    .not("home_goals", "is", null)
    .not("away_goals", "is", null)
    .order("kickoff", { ascending: false })
    .limit(limit);

  if (leagueError) throw leagueError;

  if ((leagueMatches ?? []).length >= limit) {
    return leagueMatches ?? [];
  }

  const { data: fallbackMatches, error: fallbackError } = await supabase
    .from("Matches")
    .select(
      "id, season_id, kickoff, home_team_id, away_team_id, home_goals, away_goals, is_finished",
    )
    .eq(teamColumn, teamId)
    .lt("kickoff", matchDate)
    .eq("is_finished", true)
    .not("home_goals", "is", null)
    .not("away_goals", "is", null)
    .order("kickoff", { ascending: false })
    .limit(limit * 2);

  if (fallbackError) throw fallbackError;

  return mergeUniqueMatches(leagueMatches ?? [], fallbackMatches ?? []).slice(
    0,
    limit,
  );
}

function mergeUniqueMatches(primary: MatchRow[], fallback: MatchRow[]) {
  const map = new Map<number, MatchRow>();

  for (const match of [...primary, ...fallback]) {
    map.set(match.id, match);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime(),
  );
}
