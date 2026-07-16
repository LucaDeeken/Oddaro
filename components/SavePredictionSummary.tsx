"use client";

import SaveButton from "@/components/SaveButton";

import styles from "./SavePredictionSummary.module.css";

export default function SavePredictionSummary({
  totalExactPoints,
  totalHeadToHeadPoints,
}) {
  return (
    <>
      <section className={styles.section}>
        <p>Getippte Spiele 6/7</p>
        <SaveButton></SaveButton>
        <p>Maximale Punkteausbeute: {totalExactPoints}</p>
      </section>
    </>
  );
}
