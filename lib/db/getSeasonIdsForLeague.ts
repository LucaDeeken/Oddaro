import { SupabaseClient } from "@supabase/supabase-js";

export async function getSeasonIdsForLeague(
  supabase: SupabaseClient,
  seasonId: number,
): Promise<number[]> {
  // 1) aktuelle Season laden, um league_id zu bekommen
  const { data: currentSeason, error: currentSeasonError } = await supabase
    .from("Seasons")
    .select("id, league_id")
    .eq("id", seasonId)
    .single();

  if (currentSeasonError) throw currentSeasonError;
  if (!currentSeason) throw new Error(`Season ${seasonId} not found`);

  // 2) alle Seasons dieser Liga laden
  const { data: seasons, error: seasonsError } = await supabase
    .from("Seasons")
    .select("id")
    .eq("league_id", currentSeason.league_id);

  if (seasonsError) throw seasonsError;

  return (seasons ?? []).map((season) => season.id);
}
