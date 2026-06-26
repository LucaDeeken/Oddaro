import { insertLeague } from "@/lib/db/insertLeague";
import { insertSeason } from "@/lib/db/insertSeason";
import { insertMatches } from "@/lib/db/insertMatches";
import { SupabaseClient } from "@supabase/supabase-js";

export async function runImport(finalJson, supabase: SupabaseClient) {
  const league = await insertLeague(supabase, finalJson.league);

  const season = await insertSeason(supabase, finalJson.season, league.id);

  await insertMatches(supabase, finalJson.matches, season.id);
}
