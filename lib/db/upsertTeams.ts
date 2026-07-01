import { SupabaseClient } from "@supabase/supabase-js";
import { Match } from "@/types/importMatchesDataType";

export async function upsertTeams(supabase: SupabaseClient, matches: Match[]) {
  const teamNames = new Set<string>();

  for (const match of matches) {
    teamNames.add(match.home_team);
    teamNames.add(match.away_team);
  }

  const rows = [...teamNames].map((team) => ({
    name: team,
  }));

  const { data, error } = await supabase
    .from("Teams")
    .upsert(rows, {
      onConflict: "name",
    })
    .select("id, name");

  if (error) throw error;

  const teamsByName: Record<string, number> = {};

  for (const team of data) {
    teamsByName[team.name] = team.id;
  }

  console.log("All teams successfully upserted - yeah! =) ");

  return teamsByName;
}
