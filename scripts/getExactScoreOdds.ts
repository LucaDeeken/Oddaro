import { getRecentTeamStatsForMatch } from "@/lib/db/getRecentTeamStatsForMatch";
import { calculateExpectedGoals } from "@/lib/calculations/calculateExpectedGoals";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateScoreProbabilities } from "@/lib/calculations/calculateScoreProbabilities";
import { getRecentHomeMatches } from "@/lib/db/getRecentHomeMatches";

export async function init(
  matchDate: string,
  leagueId: number,
  homeTeamId: number,
  awayTeamId: number,
) {
  const teamsStatsForMatch = await getRecentTeamStatsForMatch(supabaseAdmin, {
    matchDate,
    leagueId,
    homeTeamId,
    awayTeamId,
    sampleSize: 8,
    minLeagueSample: 4,
  });

  const expectedGoalsStatsForMatch = calculateExpectedGoals(
    teamsStatsForMatch.homeStats,
    teamsStatsForMatch.awayStats,
  );

  return calculateScoreProbabilities(
    expectedGoalsStatsForMatch.expectedHomeGoals,
    expectedGoalsStatsForMatch.expectedAwayGoals,
  );
}

//init(1, 37, 26);

async function testGetRecentHomeMatches() {
  const test = await getRecentHomeMatches(
    supabaseAdmin,
    1,
    "2026-08-29 13:30:00+00",
    1,
  );

  console.log(test);
}

testGetRecentHomeMatches().catch(console.error);
