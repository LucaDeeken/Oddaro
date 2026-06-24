export type OddsMatch = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
};

export async function getSeasonStats() {
  const apiKey = process.env.SEASON_API_KEY;

  if (!apiKey) {
    throw new Error("SEASON_API_KEY fehlt in .env.local");
  }

  const url = `https://api.football-data.org//v4/competitions/BL1/matches`;

  const res = await fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
    next: { revalidate: 300 }, // 5 Minuten Cache
  });

  if (!res.ok) {
    throw new Error("Odds API Fehler");
  }
  return res.json();
}
