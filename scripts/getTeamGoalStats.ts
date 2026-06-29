import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateTeamStats } from "@/lib/calculations/calculateTeamStats";
import { getMatches } from "@/lib/db/getAllMatches";

import "dotenv/config";

export async function init() {
  const matchData = await getMatches(supabaseAdmin);

  //filtert alle Spiele heraus, die aus spezifischen Gründen noch nicht stattgefunden haben.
  const finishedMatches = matchData.filter(
    (match) =>
      match.is_finished &&
      match.home_goals !== null &&
      match.away_goals !== null,
  );

  const data = calculateTeamStats(finishedMatches);
  return data;
}

init();
