export async function insertMatches(supabase, matches, seasonId) {
  const payload = matches.map((match) => ({
    ...match,
    season_id: seasonId,
  }));

  const { data } = await supabase.from("matches").insert(payload);

  return data;
}
