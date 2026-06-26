import { OddsMatch } from "@/types/oddsApiType";
import "dotenv/config";

export async function getWorldCupOdds(): Promise<OddsMatch[]> {
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    throw new Error("ODDS_API_KEY fehlt in .env.local");
  }

  const url =
    `https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/` +
    `?regions=eu&markets=h2h&bookmakers=tipico_de&apiKey=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // 5 Minuten Cache
  });

  if (!res.ok) {
    throw new Error("Odds API Fehler");
  }

  return res.json();
}
