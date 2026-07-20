"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import styles from "./page.module.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [registered, setRegistered] = useState(false);

  const [errors, setErrors] = useState<{
    username?: string[];
    email?: string[];
    password?: string[];
    repeatPassword?: string[];
  }>({});

  async function handleRegister({
    username,
    email,
    password,
    repeatPassword,
  }: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }) {
    setErrors({});

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          repeatPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.fieldErrors ?? {});
        return;
      }

      setRegistered(true);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  // Erfolgsseite nach Registrierung
  if (registered) {
    return (
      <main className={styles.main}>
        <section className={styles.wholeContainer}>
          <Title ta="center" className={styles.title}>
            Erfolgreich registriert!
          </Title>

          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <Text ta="center">
              Wir haben eine Bestätigungs-Mail an deine Email-Adresse gesendet.
            </Text>

            <Text ta="center" mt="md">
              Bitte prüfe deinen Posteingang und bestätige deinen Account.
            </Text>

            <Button
              component={Link}
              href="/login"
              fullWidth
              mt="xl"
              radius="md"
            >
              Zum Login
            </Button>
          </Paper>
        </section>
      </main>
    );
  }

  // Normales Registrierungsformular
  return (
    <main className={styles.main}>
      <section className={styles.wholeContainer}>
        <Title ta="center" className={styles.title}>
          Welcome!
        </Title>

        <Text className={styles.subtitle}>
          Already have an account?{" "}
          <Anchor component={Link} href="/login">
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="LordBender"
            required
            radius="md"
            classNames={{
              label: styles.label,
            }}
            value={username}
            error={errors.username?.[0]}
            onChange={(event) => {
              setUsername(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                username: undefined,
              }));
            }}
          />

          <TextInput
            label="Email"
            placeholder="lordbender@gmail.com"
            required
            mt="md"
            radius="md"
            classNames={{
              label: styles.label,
            }}
            value={email}
            error={errors.email?.[0]}
            onChange={(event) => {
              setEmail(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                email: undefined,
              }));
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            classNames={{
              label: styles.label,
            }}
            value={password}
            error={errors.password?.[0]}
            onChange={(event) => {
              setPassword(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
            }}
          />

          <PasswordInput
            label="Repeat Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            classNames={{
              label: styles.label,
            }}
            value={repeatPassword}
            error={errors.repeatPassword?.[0]}
            onChange={(event) => {
              setRepeatPassword(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                repeatPassword: undefined,
              }));
            }}
          />

          <Button
            fullWidth
            mt="xl"
            radius="md"
            onClick={() =>
              handleRegister({
                username,
                email,
                password,
                repeatPassword,
              })
            }
          >
            Register
          </Button>
        </Paper>
      </section>
    </main>
  );
}
