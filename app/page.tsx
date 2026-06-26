import { getWorldCupOdds } from "@/lib/api/oddsApi";

import styles from "./page.module.css";
import TippingDashboard from "@/components/TippingDashboard";

export default async function Home() {
  const matchesCup = await getWorldCupOdds();

  return (
    <>
      <TippingDashboard matchesCup={matchesCup}></TippingDashboard>
    </>
  );
}
