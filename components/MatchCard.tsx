"use client";
import { Card, NumberInput } from "@mantine/core";
import styles from "./MatchCard.module.css";
import { useState, useEffect } from "react";
import { init } from "@/scripts/getExactScoreOdds";

export default function MatchCard({ match, onPredictionChange }) {
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);

  console.log(match);
  useEffect(() => {
    onPredictionChange(match, homeGoals, awayGoals);
  }, [homeGoals, awayGoals]);

  useEffect(() => {
    async function loadScoreStats() {
      try {
        const res = await fetch("/api/exact-score-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seasonId: match.season_id,
            homeTeamId: match.home_team_id,
            awayTeamId: match.away_team_id,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("API Fehler:", data);
          return;
        }

        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    loadScoreStats();
  }, [match.season_id, match.home_team_id, match.away_team_id]);

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
          label={match.home_team.name}
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
          label={match.away_team.name}
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
            <span className={styles.oddsValue}>
              {homeGoals == null || awayGoals == null
                ? "-"
                : homeGoals > awayGoals
                  ? (match?.home_h2h_odd ?? "-")
                  : homeGoals < awayGoals
                    ? (match?.away_h2h_odd ?? "-")
                    : (match?.draw_h2h_odd ?? "-")}
            </span>
          </span>
        </p>
        <p className={styles.oddsLabel}>
          Exaktes Ergebnis:{" "}
          <span className={styles.oddsValue}>
            {homeGoals == null || awayGoals == null ? "-" : "huba"}
          </span>
        </p>
      </div>
    </Card>
  );
}
