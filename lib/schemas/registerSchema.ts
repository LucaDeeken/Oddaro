import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { error: "Username muss mindestens 3 Zeichen haben" })
      .max(20, { error: "Username darf maximal 20 Zeichen haben" }),

    email: z.email({ error: "Ungültige Email-Adresse" }),

    password: z
      .string()
      .min(8, { error: "Passwort muss mindestens 8 Zeichen haben" }),

    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    error: "Passwörter stimmen nicht überein",
    path: ["repeatPassword"],
  });
