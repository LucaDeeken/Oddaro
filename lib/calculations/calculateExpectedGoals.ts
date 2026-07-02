export function calculateExpectedGoals(homeStats, awayStats) {
  const homeAttack = homeStats.home_goals_for / homeStats.home_games;

  const homeDefense = homeStats.home_goals_against / homeStats.home_games;

  const awayAttack = awayStats.away_goals_for / awayStats.away_games;

  const awayDefense = awayStats.away_goals_against / awayStats.away_games;

  const expectedHomeGoals = (homeAttack + awayDefense) / 2;

  const expectedAwayGoals = (awayAttack + homeDefense) / 2;

  return {
    expectedHomeGoals,
    expectedAwayGoals,
  };
}
