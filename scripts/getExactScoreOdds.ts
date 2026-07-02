import { getTeamSeasonStatsForMatch } from "@/lib/db/getTeamSeasonStatsForMatch";
import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";

async function init() {
  const teamsSeasonStatsForMatch = await getTeamSeasonStatsForMatch(
    supabaseAdmin,
    1,
    1,
    13,
  );
  const expectedGoalsStatsForMatch = await calculateExpectedGoals(
    teamsSeasonStatsForMatch.homeStats,
    teamsSeasonStatsForMatch.awayStats,
  );

  const scores = await calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );
  console.log(scores);
}

init();
