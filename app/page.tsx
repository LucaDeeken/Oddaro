import { getOddsApi } from "@/lib/api/oddsApi";
import { getMatchesBySeasonId } from "@/lib/db/getMatchesBySeason";
import TippingDashboard from "@/components/TippingDashboard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function Home() {
  return (
    <>
      <p>hi</p>
    </>
  );
}
