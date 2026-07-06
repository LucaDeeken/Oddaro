import { Season } from "@/types/importMatchesDataType";
import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertSeason(
  supabase: SupabaseClient,
  season: Season,
  leagueId: number,
) {
  const { data, error } = await supabase
    .from("Seasons")
    .upsert(
      {
        ...season,
        league_id: leagueId,
      },
      {
        onConflict: "year,league_id",
      },
    )
    .select()
    .single();

  if (error) {
    console.error("Supabase upsert error while using 'upsertSeason':", error);
    throw error;
  }

  console.log("Season successfully upserted");
  return data;
}
