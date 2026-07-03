import { getOddsApi } from "@/lib/api/oddsApi";
import { oddsApiTeamNameMap } from "@/lib/mapping/clubNames";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { getTeamIdByName } from "@/lib/db/getTeamIdByName";
import { getHeadToHeadPoints } from "@/lib/calculations/calculateHeadToHeadPoints";
import { updateH2HIntoMatches } from "@/lib/db/updateHeadToHeadIntoMatches";

function mapOddsName(name: string) {
  return oddsApiTeamNameMap[name] ?? name;
}

async function init() {
  const oddsMatches = await getOddsApi();

  for (const oddsMatch of oddsMatches) {
    const homeName = mapOddsName(oddsMatch.home_team);
    const awayName = mapOddsName(oddsMatch.away_team);

    const homeTeamId = await getTeamIdByName(supabaseAdmin, homeName);
    const awayTeamId = await getTeamIdByName(supabaseAdmin, awayName);

    const homeWinOdds = getHeadToHeadPoints(oddsMatch, 1, 0);
    const drawOdds = getHeadToHeadPoints(oddsMatch, 1, 1);
    const awayWinOdds = getHeadToHeadPoints(oddsMatch, 0, 1);

    const update = await updateH2HIntoMatches(
      supabaseAdmin,
      homeWinOdds,
      drawOdds,
      awayWinOdds,
      homeTeamId,
      awayTeamId,
      oddsMatch,
    );
  }
}
init().catch(console.error);
