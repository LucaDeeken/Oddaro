import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/schemas/registerSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: z.flattenError(result.error),
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Fehler" }, { status: 500 });
  }
}
