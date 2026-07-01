import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertTeamStats(
  supabase: SupabaseClient,
  seasonId: number,
  allTeams,
) {
  for (const team_id in allTeams) {
    const stats = allTeams[team_id];

    const { error } = await supabase.from("Team_Season_Stats").upsert(
      {
        season_id: seasonId,
        team_id: Number(team_id),
        home_games: stats.homeGames,
        away_games: stats.awayGames,
        home_goals_for: stats.homeGoalsFor,
        home_goals_against: stats.homeGoalsAgainst,
        away_goals_for: stats.awayGoalsFor,
        away_goals_against: stats.awayGoalsAgainst,
      },
      {
        onConflict: "season_id,team_id",
      },
    );

    if (error) throw error;
  }
  console.log("All team stats successfully upserted - yeah! =)");
}
