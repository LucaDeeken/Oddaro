import { getWorldCupOdds } from "@/lib/oddsApi";
import { getSeasonStats } from "@/lib/goalsStatisticApi";

import styles from "./page.module.css";
import TippingDashboard from "@/components/TippingDashboard";

export default async function Home() {
  const matchesCup = await getWorldCupOdds();
  const wholeSeason = await getSeasonStats();
  console.log(wholeSeason);

  return (
    <>
      <TippingDashboard matchesCup={matchesCup}></TippingDashboard>
    </>
  );
}
