import { getOddsApi } from "@/lib/api/oddsApi";
import TippingDashboard from "@/components/TippingDashboard";

export default async function Home() {
  const matchesCup = await getOddsApi();
  console.log(matchesCup);
  return (
    <>
      <TippingDashboard matchesCup={matchesCup}></TippingDashboard>
    </>
  );
}
