import { Stack, Title } from "@mantine/core";
import styles from "./DateWrapper.module.css";

export default function DateWrapper({
  date,
  children,
}: {
  date: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Title className={styles.title} order={3} mb="md" mt="md">
        {date}
      </Title>

      <Stack className={styles.wholeSection}>{children}</Stack>
    </section>
  );
}
