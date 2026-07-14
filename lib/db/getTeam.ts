import { SupabaseClient } from "@supabase/supabase-js";

export async function getTeam(supabase: SupabaseClient, teamId: number) {
  const { data, error } = await supabase
    .from("Teams")
    .select("id, promoted")
    .eq("id", teamId)
    .single();

  if (error) throw error;

  return data;
}
