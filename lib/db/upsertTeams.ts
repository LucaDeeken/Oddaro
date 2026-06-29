import { SupabaseClient } from "@supabase/supabase-js";
import { Match } from "@/types/importMatchesDataType";

export async function upsertTeams(supabase: SupabaseClient, matches: Match[]) {
  const teamNames = new Set<string>();

  for (const match of matches) {
    teamNames.add(match.home_team);
    teamNames.add(match.away_team);
  }

  for (const team of teamNames) {
    const { error } = await supabase.from("Teams").upsert(
      {
        name: team,
      },
      {
        onConflict: "name",
      },
    );

    if (error) throw error;
  }
  console.log("All teams successfully upserted - yeah! =)");
}
