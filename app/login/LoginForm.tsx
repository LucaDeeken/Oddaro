"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});

  const [serverError, setServerError] = useState("");

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setErrors({});
    setServerError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        } else {
          setServerError(data.error);
        }

        return;
      }

      console.log("Login erfolgreich", data.user);

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error(error);
      setServerError("Etwas ist schiefgelaufen");
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.wholeContainer}>
        <Container size={420} my={40}>
          <Title ta="center" className={styles.title}>
            Welcome back!
          </Title>

          <Text className={styles.subtitle}>
            Do not have an account yet?{" "}
            <Anchor component={Link} href="/register">
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              radius="md"
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

            {serverError && (
              <Text c="red" mt="sm">
                {serverError}
              </Text>
            )}

            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />

              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>

            <Button
              fullWidth
              mt="xl"
              radius="md"
              onClick={() =>
                handleLogin({
                  email,
                  password,
                })
              }
            >
              Sign in
            </Button>
          </Paper>
        </Container>
      </section>
    </main>
  );
}
