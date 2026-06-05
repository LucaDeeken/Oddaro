import { Card, TextInput, Button, Text } from "@mantine/core";
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
      {/* Teams */}
      <Text className={styles.teams}>
        {match.home} vs {match.away}
      </Text>

      {/* Inputs */}
      <div className={styles.inputs}>
        <TextInput placeholder="Home Goals" />
        <TextInput placeholder="Away Goals" />
      </div>

      {/* Odds Info */}
      <Text className={styles.odds}>Punkteausbeute: +12.4</Text>
    </Card>
  );
}
