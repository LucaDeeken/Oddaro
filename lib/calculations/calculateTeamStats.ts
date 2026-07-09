export function buildHomeStats(matches) {
  return {
    home_games: matches.length,
    home_goals_for: matches.reduce((sum, match) => sum + match.home_goals, 0),
    home_goals_against: matches.reduce(
      (sum, match) => sum + match.away_goals,
      0,
    ),
  };
}

export function buildAwayStats(matches) {
  return {
    away_games: matches.length,
    away_goals_for: matches.reduce((sum, match) => sum + match.away_goals, 0),
    away_goals_against: matches.reduce(
      (sum, match) => sum + match.home_goals,
      0,
    ),
  };
}
