"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas/registerSchema";

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import styles from "./page.module.css";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  async function validateOnServer() {
    try {
      const res = await fetch("/api/zod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          repeatPassword: repeatPassword,
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
        console.error("API Fehler für Zod:", { data });
        return;
      }

      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

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
    const result = registerSchema.safeParse({
      username,
      email,
      password,
      repeatPassword,
    });

    console.log(result);
    if (!result.success) {
      const errors = z.flattenError(result.error);

      console.log(errors.fieldErrors);

      return;
    } else {
      validateOnServer();
    }
  }

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
            onChange={(event) => setUsername(event.currentTarget.value)}
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
            onChange={(event) => setEmail(event.currentTarget.value)}
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
            onChange={(event) => setPassword(event.currentTarget.value)}
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
            onChange={(event) => setRepeatPassword(event.currentTarget.value)}
          />
          <Button
            fullWidth
            mt="xl"
            radius="md"
            onClick={() =>
              handleRegister({ username, email, password, repeatPassword })
            }
          >
            Register
          </Button>
        </Paper>
      </section>
    </main>
  );
}
