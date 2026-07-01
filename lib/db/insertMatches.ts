import { SupabaseClient } from "@supabase/supabase-js";
import { Match } from "@/types/importMatchesDataType";

export async function insertMatches(
  supabase: SupabaseClient,
  matches: Match[],
  seasonId: number,
  teamsByName: Record<string, number>,
) {
  const payload = matches.map((match) => ({
    season_id: seasonId,
    matchday: match.matchday,
    home_team_id: teamsByName[match.home_team],
    away_team_id: teamsByName[match.away_team],
    home_goals: match.home_goals,
    away_goals: match.away_goals,
    kickoff: match.kickoff,
    is_finished: match.is_finished,
  }));

  const { data, error } = await supabase.from("Matches").insert(payload);

  if (error) {
    console.error("Supabase insert error while using 'insertMatches':", error);
    throw error;
  } else {
    console.log("Match or Matches successfully inserted");
  }

  return data;
}
