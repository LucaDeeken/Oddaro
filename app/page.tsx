import { matches } from "@/lib/matches";
import { getWorldCupOdds } from "@/lib/oddsApi";

import styles from "./page.module.css";
import SaveButton from "@/components/SaveButton";
import MatchCard from "@/components/MatchCard";
import DateWrapper from "@/components/DateWrapper";

export default async function Home() {
  const matchesCup = await getWorldCupOdds();
  console.log(matchesCup);

  //hole alle individuellen Datumseinträge
  const dates: string[] = [];

  for (const match of matchesCup) {
    const date = new Date(match.commence_time).toLocaleDateString("de-DE");

    if (!dates.includes(date)) {
      dates.push(date);
    }
  }

  return (
    <>
      <main className={styles.main}>
        {dates.map((date) => {
          const matchesForDate = matchesCup.filter((match) => {
            const matchDate = new Date(match.commence_time).toLocaleDateString(
              "de-DE",
            );

            return matchDate === date;
          });

          return (
            <DateWrapper key={date} date={date}>
              {matchesForDate.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </DateWrapper>
          );
        })}
      </main>
    </>
  );
}
