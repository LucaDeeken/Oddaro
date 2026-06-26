import { SupabaseClient } from "@supabase/supabase-js";

export async function insertMatches(
  supabase: SupabaseClient,
  matches,
  seasonId,
) {
  const payload = matches.map((match) => ({
    ...match,
    season_id: seasonId,
  }));

  const { data, error } = await supabase.from("Matches").insert(payload);

  if (error) {
    console.error("Supabase insert error while using 'insertMatches':", error);
    throw error;
  } else {
    console.log("Match or Matches successfully inserted");
  }

  return data;
}
