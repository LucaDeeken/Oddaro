import { SupabaseClient } from "@supabase/supabase-js";

export async function getMatchesBySeasonAndMatchday(
  supabase: SupabaseClient,
  seasonId: number,
  matchday: string,
) {
  const { data, error } = await supabase
    .from("Matches")
    .select("*")
    .eq("season_id", seasonId)
    .eq("matchday", matchday)
    .order("kickoff", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch matches: ${error.message}`);
  }

  return data;
}
