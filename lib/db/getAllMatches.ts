import { SupabaseClient } from "@supabase/supabase-js";

export async function getAllMatches(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("Matches").select("*");

  if (error) throw error;

  return data;
}
