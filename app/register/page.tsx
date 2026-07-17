"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
        setErrors(data.fieldErrors);
        return;
      }
      setErrors({});
      console.log("Erfolg:", data);
    } catch (error) {
      console.error("Fetch error:", error);
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
            onChange={(event) => {
              setUsername(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                username: undefined,
              }));
            }}
            error={errors.username?.[0]}
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
            onChange={(event) => {
              setEmail(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                email: undefined,
              }));
            }}
            error={errors.email?.[0]}
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
            onChange={(event) => {
              setPassword(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
            }}
            error={errors.password?.[0]}
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
            onChange={(event) => {
              setRepeatPassword(event.currentTarget.value);

              setErrors((prev) => ({
                ...prev,
                repeatPassword: undefined,
              }));
            }}
            error={errors.repeatPassword?.[0]}
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
