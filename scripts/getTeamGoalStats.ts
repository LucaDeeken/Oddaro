import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { calculateGoalStatistics } from "@/lib/calculations/goalStatistics";
import { getMatches } from "@/lib/db/getAllMatches";

import "dotenv/config";

export async function init() {
  const matchData = await getMatches(supabaseAdmin);
  const data = calculateGoalStatistics(matchData);
  return data;
}

init();
