import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { supabase } from "@/lib/db/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: z.flattenError(result.error).fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { username, email, password } = result.data;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registrierung erfolgreich",
      user: data.user,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Server Fehler",
      },
      {
        status: 500,
      },
    );
  }
}
