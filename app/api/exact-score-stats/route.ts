import { NextResponse } from "next/server";
import { initGetExactScoreOddsScript } from "@/scripts/getExactScoreOdds";

export async function POST(req: Request) {
  try {
    const { seasonId, homeTeamId, awayTeamId, kickoff } = await req.json();

    const result = await initGetExactScoreOddsScript(
      kickoff,
      seasonId,
      homeTeamId,
      awayTeamId,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("exact-score-stats error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
