import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const result = registerSchema.safeParse(body);
    console.log(result);
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

    const supabase = await createClient();

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
      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
          fieldErrors: {},
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
  } catch (error) {
    console.error("REGISTER ERROR:", error);

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
