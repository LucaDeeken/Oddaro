import { SupabaseClient } from "@supabase/supabase-js";

export async function getMatchesBySeasonId(
  supabase: SupabaseClient,
  seasonId: number,
) {
  const { data, error } = await supabase
    .from("Matches")
    .select(
      `
      *,
      home_team:Teams!Matches_home_team_id_fkey(name),
      away_team:Teams!Matches_away_team_id_fkey(name)
    `,
    )
    .eq("season_id", seasonId);

  if (error) throw error;

  return data;
}
