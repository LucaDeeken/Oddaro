import { SupabaseClient } from "@supabase/supabase-js";

export async function getTeamSeasonStatsForMatch(
  supabase: SupabaseClient,
  seasonId: number,
  homeTeamId: number,
  awayTeamId: number,
) {
  const { data, error } = await supabase
    .from("Team_Season_Stats")
    .select("*")
    .eq("season_id", seasonId)
    .in("team_id", [homeTeamId, awayTeamId]);

  if (error) throw error;

  const homeStats = data.find((row) => row.team_id === homeTeamId);
  const awayStats = data.find((row) => row.team_id === awayTeamId);

  if (!homeStats || !awayStats) {
    throw new Error("Team stats not found for match");
  }

  return {
    homeStats,
    awayStats,
  };
}
