import { getOddsApi } from "@/lib/api/oddsApi";
import { getMatchesBySeasonId } from "@/lib/db/getMatchesBySeason";
import TippingDashboard from "@/components/TippingDashboard";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

export default async function Dashboard() {
  const matchesCup = await getMatchesBySeasonId(supabaseAdmin, 2);
  //console.log(matchesCup);
  const firstMatchdayMatches = matchesCup.filter(
    (match) => match.matchday === "1. Spieltag",
  );
  return (
    <>
      <TippingDashboard matchesCup={firstMatchdayMatches}></TippingDashboard>
    </>
  );
}
