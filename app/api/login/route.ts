import { NextResponse } from "next/server";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = loginSchema.safeParse(body);

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

    const { email, password } = result.data;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 401,
        },
      );
    }
    console.log(data.session);
    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (error) {
    console.error("Login Fehler:", error);

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
