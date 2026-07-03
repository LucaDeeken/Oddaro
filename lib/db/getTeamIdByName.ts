import { SupabaseClient } from "@supabase/supabase-js";

export async function getTeamIdByName(supabase: SupabaseClient, name: string) {
  const { data, error } = await supabase
    .from("Teams")
    .select("id")
    .eq("name", name)
    .single();

  if (error) throw error;

  return data.id;
}
