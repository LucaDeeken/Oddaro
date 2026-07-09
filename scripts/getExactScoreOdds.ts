//import { getRecentTeamStatsForMatch } from "@/lib/db/getRecentTeamStatsForMatch";
import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";
import { getRecentMatchesBySide } from "@/lib/db/getRecentMatchStats";
import {
  buildHomeStats,
  buildAwayStats,
} from "@/lib/calculations/calculateTeamStats";

export async function initGetExactScoreOddsScript(
  matchDate: string,
  seasonId: number,
  homeTeamId: number,
  awayTeamId: number,
) {
  const homeTeamStats = await getRecentMatchesBySide(
    supabaseAdmin,
    homeTeamId,
    matchDate,
    seasonId,
    "home",
  );

  const awayTeamStats = await getRecentMatchesBySide(
    supabaseAdmin,
    awayTeamId,
    matchDate,
    seasonId,
    "away",
  );

  const homeStats = buildHomeStats(homeTeamStats);
  const awayStats = buildAwayStats(awayTeamStats);

  const expectedGoalsStatsForMatch = calculateExpectedGoals(
    homeStats,
    awayStats,
  );

  console.log(expectedGoalsStatsForMatch);
  return calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );
}
