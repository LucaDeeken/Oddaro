import { SupabaseClient } from "@supabase/supabase-js";

export async function getMatches(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("Matches").select("*");

  if (error) {
    console.error("Supabase select error while using 'getMatches':", error);
    throw error;
  } else {
    console.log("All matches were successfully fetched - woohoo!");
  }

  return data;
}
