"use client";
import { useState } from "react";
import { Predictions } from "@/types/predicitonsType";

import styles from "./TippingDashboard.module.css";

import MatchCard from "@/components/MatchCard";
import DateWrapper from "@/components/DateWrapper";
import SavePredictionSummary from "@/components/SavePredictionSummary";

export default function TippingDashboard({ matchesCup }) {
  //Speichert die TorTipps des Users
  const [predictions, setPredictions] = useState<Predictions>({});
  //aktuallisiert den TippState des Users
  function updatePrediction(
    match,
    homeGoals: number | null,
    awayGoals: number | null,
    h2hPoints: number | null,
    exactPoints: number | null,
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
        h2hPoints,
        exactPoints,
      },
    }));
  }

  const totalHeadToHeadPoints = Object.values(predictions).reduce(
    (sum, prediction) => sum + (prediction.h2hPoints ?? 0),
    0,
  );

  const totalExactPoints = Object.values(predictions).reduce(
    (sum, prediction) => sum + (prediction.exactPoints ?? 0),
    0,
  );
  console.log(predictions);

  //hole alle individuellen Datumseinträge
  const dates: string[] = [];
  for (const match of matchesCup) {
    const date = new Date(match.kickoff).toLocaleDateString("de-DE");
    if (!dates.includes(date)) {
      dates.push(date);
    }
  }

  return (
    <>
      <main className={styles.main}>
        {dates.map((date) => {
          const matchesForDate = matchesCup.filter((match) => {
            const matchDate = new Date(match.kickoff).toLocaleDateString(
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
        <SavePredictionSummary
          totalExactPoints={totalExactPoints}
          totalHeadToHeadPoints={totalHeadToHeadPoints}
        />
      </main>
    </>
  );
}
