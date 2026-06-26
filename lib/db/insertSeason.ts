import { Season } from "@/types/importMatchesDataType";
import { SupabaseClient } from "@supabase/supabase-js";

export async function insertSeason(
  supabase: SupabaseClient,
  season: Season,
  leagueId,
) {
  const { data, error } = await supabase
    .from("Seasons")
    .insert({
      ...season,
      league_id: leagueId,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error while using 'insertSeason':", error);
    throw error;
  } else {
    console.log("Season successfully inserted");
  }

  return data;
}
