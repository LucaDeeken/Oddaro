import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAllMatches } from "@/lib/db/getAllMatches";
import { upsertTeams } from "@/lib/db/upsertTeams";

import "dotenv/config";

export async function init() {
  try {
    const matchData = await getAllMatches(supabaseAdmin);

    await upsertTeams(supabaseAdmin, matchData);

    console.log("Teamupsert successfully completed!.");
  } catch (error) {
    console.error("Failed to upsert Teams:", error);
  }
}

init();
