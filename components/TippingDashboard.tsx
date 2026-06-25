"use client";
import { useState } from "react";
import { Predictions } from "@/types/predicitonsType";

import styles from "./TippingDashboard.module.css";
import SaveButton from "@/components/SaveButton";
import MatchCard from "@/components/MatchCard";
import DateWrapper from "@/components/DateWrapper";

export default function TippingDashboard({ matchesCup }) {
  //Speichert die TorTipps des Users
  const [predictions, setPredictions] = useState<Predictions>({});
  //aktuallisiert den TippState des Users
  function updatePrediction(
    match,
    homeGoals: number | null,
    awayGoals: number | null,
  ) {
    setPredictions((prev) => ({
      ...prev,
      [match.id]: {
        matchId: match.id,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        commenceTime: match.commence_time,
        homeGoals,
        awayGoals,
      },
    }));
  }

  console.log(matchesCup);
  console.log(predictions);

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
                <MatchCard
                  key={match.id}
                  match={match}
                  onPredictionChange={updatePrediction}
                />
              ))}
            </DateWrapper>
          );
        })}
        <SaveButton></SaveButton>
      </main>
    </>
  );
}
