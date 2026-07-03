import { getTeamSeasonStatsForMatch } from "@/lib/db/getTeamSeasonStatsForMatch";
import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";

async function init(seasonid: number, homeTeamId: number, awayTeamId: number) {
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

  const scores = calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );
  console.log(scores);
}

init(1, 37, 26);
