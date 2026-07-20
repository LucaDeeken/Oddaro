import { redirect } from "next/navigation";

import styles from "./page.module.css";

import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Progress,
  Text,
} from "@mantine/core";

import LogoutButton from "@/components/LogoutButton";
import { getProfile } from "@/lib/db/getProfile";

export default async function ProfilePage() {
  const { user, profile } = await getProfile();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={styles.main}>
      <Card withBorder padding="xl" radius="md" w={300} className={styles.card}>
        <h1 className={styles.header}>Profil</h1>

        <Text>Email: {user.email}</Text>

        <Text>Username: {profile?.username}</Text>

        <Text>
          Erstellt am:{" "}
          {profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString("de-DE")
            : "-"}
        </Text>

        <LogoutButton />
      </Card>
    </main>
  );
}
