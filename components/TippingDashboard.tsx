"use client";
import { useState } from "react";
import { Predictions } from "@/types/predicitons";

import styles from "./TippingDashboard.module.css";
import SaveButton from "@/components/SaveButton";
import MatchCard from "@/components/MatchCard";
import DateWrapper from "@/components/DateWrapper";

export default function TippingDashboard({ matchesCup }) {
  const [predictions, setPredictions] = useState<Predictions>({});

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
        <SaveButton></SaveButton>
      </main>
    </>
  );
}
