export function getHeadToHeadPoints(match, homeGoals, awayGoals) {
  if (homeGoals === null || awayGoals === null) return 0;

  const outcomes = match.bookmakers?.[0]?.markets?.[0]?.outcomes;

  if (!outcomes) return 0;

  let chosenPrediction;
  if (homeGoals > awayGoals) {
    chosenPrediction = outcomes.find(
      (outcome) => outcome.name === match.home_team,
    );
  }

  if (awayGoals > homeGoals) {
    chosenPrediction = outcomes.find(
      (outcome) => outcome.name === match.away_team,
    );
  }

  if (awayGoals === homeGoals) {
    chosenPrediction = outcomes.find((outcome) => outcome.name === "Draw");
  }

  return Math.round(chosenPrediction.price * 3);
}
