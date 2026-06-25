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
    throw new Error("api football Fehler");
  }
  return res.json();
}
