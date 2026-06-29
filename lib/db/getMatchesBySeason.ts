import { SupabaseClient } from "@supabase/supabase-js";

export async function getMatchesBySeasonId(
  supabase: SupabaseClient,
  seasonId: number,
) {
  const { data, error } = await supabase
    .from("Matches")
    .select("*")
    .eq("season_id", seasonId);

  if (error) throw error;

  return data;
}
