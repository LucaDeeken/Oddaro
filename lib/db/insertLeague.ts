import { League } from "@/types/importMatchesDataType";

export async function insertLeague(supabase, league: League) {
  const { data } = await supabase
    .from("leagues")
    .insert(league)
    .select()
    .single();

  return data;
}
