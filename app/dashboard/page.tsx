import { getOddsApi } from "@/lib/api/oddsApi";
import { getMatchesBySeasonId } from "@/lib/db/getMatchesBySeason";
import TippingDashboard from "@/components/TippingDashboard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function Dashboard() {
  const matchesCup = await getMatchesBySeasonId(supabaseAdmin, 4);

  //console.log(matchesCup);

  return (
    <>
      <TippingDashboard matchesCup={matchesCup}></TippingDashboard>
    </>
  );
}
