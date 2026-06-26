import { League } from "@/types/importMatchesDataType";
import { SupabaseClient } from "@supabase/supabase-js";

export async function insertLeague(supabase: SupabaseClient, league: League) {
  const { data, error } = await supabase
    .from("Leagues")
    .insert(league)
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error while using 'insertLeague':", error);
    throw error;
  } else {
    console.log("League successfully inserted");
  }

  return data;
}
