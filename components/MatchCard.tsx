"use client";
import { Card, NumberInput } from "@mantine/core";
import styles from "./MatchCard.module.css";
import { useState, useEffect } from "react";

export default function MatchCard({ match, onPredictionChange }) {
  const [homeGoals, setHomeGoals] = useState<number | null>(null);
  const [awayGoals, setAwayGoals] = useState<number | null>(null);
  const [scoreStats, setScoreStats] = useState<ScoreStat[]>([]);

  console.log(match);
  useEffect(() => {
    onPredictionChange(match, homeGoals, awayGoals);
  }, [homeGoals, awayGoals]);

  type ScoreStat = {
    score: string;
    home_goals: number;
    away_goals: number;
    probability: number;
    odd: number;
  };

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
            kickoff: match.kickoff,
          }),
        });

        const text = await res.text();

        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text;
        }

        if (!res.ok) {
          console.error("API Fehler für Match:", {
            matchId: match.id,
            seasonId: match.season_id,
            homeTeamId: match.home_team_id,
            awayTeamId: match.away_team_id,
            kickoff: match.kickoff,
            response: data,
          });
          return;
        }
        setScoreStats(data);
        console.log("Score stats:", data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    loadScoreStats();
  }, [
    match.home_team_id,
    match.away_team_id,
    match.id,
    match.kickoff,
    match.season_id,
  ]);

  const exactScore =
    homeGoals == null || awayGoals == null ? null : `${homeGoals}:${awayGoals}`;

  const exactScoreData =
    exactScore == null
      ? null
      : scoreStats.find((item) => item.score === exactScore);
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
            {homeGoals == null || awayGoals == null
              ? "-"
              : (exactScoreData?.odd ?? "-")}
          </span>
        </p>
      </div>
    </Card>
  );
}
