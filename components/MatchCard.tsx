"use client";
import { Card, NumberInput, Text } from "@mantine/core";
import styles from "./MatchCard.module.css";
import { useState, useEffect } from "react";

export default function MatchCard({ match, onPredictionChange }) {
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);

  useEffect(() => {
    onPredictionChange(match, homeGoals, awayGoals);
  }, [homeGoals, awayGoals]);

  function getWinner() {
    if (homeGoals === null || awayGoals === null) return "";

    if (homeGoals > awayGoals) {
      return match.home_team;
    }

    if (awayGoals > homeGoals) {
      return match.away_team;
    }

    return "DRAW";
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
    >
      {/* Teams
      <Text className={styles.teams}>
        {match.home} vs {match.away}
      </Text> */}

      {/* Inputs */}
      <div className={styles.inputs}>
        <NumberInput
          hideControls
          className={styles.numberInput}
          classNames={{
            label: styles.label,
            input: styles.input,
          }}
          label={match.home_team}
          min={0}
          max={9}
          placeholder="0"
          onChange={(value) => {
            if (typeof value === "number") {
              setHomeGoals(value);
            } else {
              setHomeGoals(null);
            }
          }}
        />
        <span className={styles.spanBetweenGoals}>:</span>
        <NumberInput
          hideControls
          className={styles.numberInput}
          classNames={{
            label: styles.label,
            input: styles.input,
          }}
          label={match.away_team}
          min={0}
          max={9}
          placeholder="0"
          onChange={(value) => {
            if (typeof value === "number") {
              setAwayGoals(value);
            } else {
              setAwayGoals(null);
            }
          }}
        />
      </div>

      {/* Odds Info */}
      <div className={styles.oddsWrapper}>
        <p>{getWinner()}</p>
        <p className={styles.oddsValue}>12.4</p>
        <p className={styles.oddsLabel}> Punkte</p>
      </div>
    </Card>
  );
}
