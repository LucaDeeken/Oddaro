import { upsertMatches } from "@/lib/db/upsertMatches";
import { upsertLeague } from "@/lib/db/upsertLeague";
import { upsertSeason } from "@/lib/db/upsertSeason";
import { upsertTeams } from "@/lib/db/upsertTeams";
import { SupabaseClient } from "@supabase/supabase-js";

export async function runImport(finalJson, supabase: SupabaseClient) {
  const league = await upsertLeague(supabase, finalJson.league);

  const season = await upsertSeason(supabase, finalJson.season, league.id);

  const teamsByName = await upsertTeams(supabase, finalJson.matches);

  await upsertMatches(supabase, finalJson.matches, season.id, teamsByName);
}
