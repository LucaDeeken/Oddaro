import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className={styles.main}>
      <h1>Profil</h1>

      <p>ID: {user.id}</p>

      <p>Email: {user.email}</p>

      <p>Username: {user.user_metadata.username}</p>

      <p>Erstellt am: {user.created_at}</p>
      <LogoutButton />
    </main>
  );
}
