import { getTeamSeasonStatsForMatch } from "@/lib/db/getTeamSeasonStatsForMatch";
import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";

export async function init(
  seasonid: number,
  homeTeamId: number,
  awayTeamId: number,
) {
  const teamsSeasonStatsForMatch = await getTeamSeasonStatsForMatch(
    supabaseAdmin,
    seasonid,
    homeTeamId,
    awayTeamId,
  );
  const expectedGoalsStatsForMatch = calculateExpectedGoals(
    teamsSeasonStatsForMatch.homeStats,
    teamsSeasonStatsForMatch.awayStats,
  );

  return calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );
}

//init(1, 37, 26);
