"use client";
import { Card, NumberInput } from "@mantine/core";
import styles from "./MatchCard.module.css";
import { useState, useEffect } from "react";
import { getHeadToHeadPoints } from "@/lib/pointsCalculator";

export default function MatchCard({ match, onPredictionChange }) {
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);

  useEffect(() => {
    onPredictionChange(match, homeGoals, awayGoals);
  }, [homeGoals, awayGoals]);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
    >
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
        <p className={styles.oddsLabel}>
          Richtige Tendenz:{" "}
          <span className={styles.oddsValue}>
            {getHeadToHeadPoints(match, homeGoals, awayGoals)}
          </span>
        </p>
        <p className={styles.oddsLabel}>
          Exaktes Ergebnis: <span className={styles.oddsValue}>0</span>
        </p>
      </div>
    </Card>
  );
}
