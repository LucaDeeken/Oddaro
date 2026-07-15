import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";
import { getRecentMatchesBySide } from "@/lib/db/getRecentMatchStats";
import {
  buildHomeStats,
  buildAwayStats,
} from "@/lib/calculations/calculateTeamStats";
import { getTeam } from "@/lib/db/getTeam";

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

  const homeTeam = await getTeam(supabaseAdmin, homeTeamId);
  const awayTeam = await getTeam(supabaseAdmin, awayTeamId);

  if (homeTeam.promoted) {
    expectedGoalsStatsForMatch.expectedHomeGoals *= 0.5;
    expectedGoalsStatsForMatch.expectedAwayGoals *= 1.5;
  }
  if (awayTeam.promoted) {
    expectedGoalsStatsForMatch.expectedHomeGoals *= 1.5;
    expectedGoalsStatsForMatch.expectedAwayGoals *= 0.5;
  }

  const scores = calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );

  return scores;
}
