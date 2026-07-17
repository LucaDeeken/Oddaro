import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Ungültige Email-Adresse",
  }),

  password: z.string().min(1, {
    error: "Passwort darf nicht leer sein",
  }),
});
