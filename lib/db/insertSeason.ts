import { Season } from "@/types/importMatchesDataType";

export async function insertSeason(supabase, season: Season, leagueId) {
  const { data } = await supabase
    .from("seasons")
    .insert({
      ...season,
      league_id: leagueId,
    })
    .select()
    .single();

  return data;
}
