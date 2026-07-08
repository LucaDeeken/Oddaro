import { SupabaseClient } from "@supabase/supabase-js";
import { MatchRow } from "@/types/getRecentTeamStatsForMatch";
import { getSeasonIdsForLeague } from "@/lib/db/getSeasonIdsForLeague";

export async function getRecentHomeMatches(
  supabase: SupabaseClient,
  teamId: number,
  matchDate: string,
  seasonId: number,
  limit = 8,
): Promise<MatchRow[]> {
  const seasonIds = await getSeasonIdsForLeague(supabase, seasonId);

  const { data, error } = await supabase
    .from("Matches")
    .select(
      "id, season_id, kickoff, home_team_id, away_team_id, home_goals, away_goals, is_finished",
    )
    .eq("home_team_id", teamId)
    .in("season_id", seasonIds)
    .lt("kickoff", matchDate)
    .eq("is_finished", true)
    .not("home_goals", "is", null)
    .not("away_goals", "is", null)
    .order("kickoff", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data ?? [];
}
