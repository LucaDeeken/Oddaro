import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateTeamStats } from "@/lib/calculations/calculateTeamStats";
import { getMatchesBySeasonId } from "@/lib/db/getMatchesBySeason";
import { getSeasonIdByYear } from "@/lib/db/getSeasonId";
import { upsertTeamStats } from "@/lib/db/upsertTeamStats";

import "dotenv/config";

export async function init() {
  try {
    const leagueId = 1;
    const seasonYear = "2026";

    const seasonId = await getSeasonIdByYear(
      supabaseAdmin,
      leagueId,
      seasonYear,
    );

    const matchData = await getMatchesBySeasonId(supabaseAdmin, seasonId);

    const finishedMatches = matchData.filter(
      (match) =>
        match.is_finished &&
        match.home_goals !== null &&
        match.away_goals !== null,
    );

    const teamStats = calculateTeamStats(finishedMatches);

    await upsertTeamStats(supabaseAdmin, seasonId, teamStats);

    console.log("Team stats init completed.");
  } catch (error) {
    console.error("Failed to init team stats:", error);
  }
}

init();
