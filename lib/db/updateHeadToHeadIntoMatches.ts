import { SupabaseClient } from "@supabase/supabase-js";

export async function updateH2HIntoMatches(
  supabase: SupabaseClient,
  homeOdd: number,
  drawOdd: number,
  awayOdd: number,
  homeTeamId: number,
  awayTeamId: number,
  oddsMatch,
) {
  const { error } = await supabase
    .from("Matches")
    .update({
      home_h2h_odd: homeOdd,
      draw_h2h_odd: drawOdd,
      away_h2h_odd: awayOdd,
      odds_fetched_at: new Date().toISOString(),
    })
    .eq("home_team_id", homeTeamId)
    .eq("away_team_id", awayTeamId)
    .eq("kickoff", oddsMatch.commence_time);

  if (error) throw error;

  return;
}
