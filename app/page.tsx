import { matches } from "@/lib/matches";

import styles from "./page.module.css";
import SaveButton from "@/components/SaveButton";
import MatchCard from "@/components/MatchCard";
import DateWrapper from "@/components/DateWrapper";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <DateWrapper date="05.06.2026">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </DateWrapper>
        <DateWrapper date="06.06.2026">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </DateWrapper>
        <div className={styles.saveBar}>
          <SaveButton />
        </div>
      </main>
    </>
  );
}
