import { matches } from "@/lib/matches";
import styles from "./page.module.css";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </main>
    </>
  );
}
