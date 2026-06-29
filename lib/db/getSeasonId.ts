import { SupabaseClient } from "@supabase/supabase-js";

export async function getSeasonIdByYear(
  supabase: SupabaseClient,
  leagueId: number,
  year: string,
) {
  const { data, error } = await supabase
    .from("Seasons")
    .select("id")
    .eq("league_id", leagueId)
    .eq("year", year)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}
