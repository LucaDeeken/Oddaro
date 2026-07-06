// app/api/match-stats/route.ts
import { NextResponse } from "next/server";
import { init } from "@/scripts/getExactScoreOdds";

export async function POST(req: Request) {
  const { seasonId, homeTeamId, awayTeamId } = await req.json();

  const result = await init(seasonId, homeTeamId, awayTeamId);

  return NextResponse.json(result);
}
