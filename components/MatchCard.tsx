import { Card, NumberInput, Text } from "@mantine/core";
import styles from "./MatchCard.module.css";

export default function MatchCard({ match }) {
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
          label={match.home}
          min={0}
          max={9}
          placeholder="0"
        />
        <span className={styles.spanBetweenGoals}>:</span>
        <NumberInput
          hideControls
          className={styles.numberInput}
          classNames={{
            label: styles.label,
            input: styles.input,
          }}
          label={match.away}
          min={0}
          max={9}
          placeholder="0"
        />
      </div>

      {/* Odds Info */}
      <div className={styles.oddsWrapper}>
        <p className={styles.oddsValue}>12.4</p>
        <p className={styles.oddsLabel}> Punkte</p>
      </div>
    </Card>
  );
}
