import { League } from "@/types/importMatchesDataType";
import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertLeague(supabase: SupabaseClient, league: League) {
  const { data, error } = await supabase
    .from("Leagues")
    .upsert(league, {
      onConflict: "name,country,type",
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase upsert error while using 'upsertLeague':", error);
    throw error;
  }

  console.log("League successfully upserted");
  return data;
}
