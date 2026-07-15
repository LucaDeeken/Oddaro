import { poissonProbability } from "./poisson";

export function calculateScoreProbabilities(
  expectedHomeGoals: number,
  expectedAwayGoals: number,
) {
  const scores = [];

  for (let home = 0; home <= 9; home++) {
    for (let away = 0; away <= 9; away++) {
      const probability =
        poissonProbability(home, expectedHomeGoals) *
        poissonProbability(away, expectedAwayGoals);

      const odd = 1 / probability;

      scores.push({
        score: `${home}:${away}`,
        home_goals: home,
        away_goals: away,
        probability,
        odd: Number(odd.toFixed(2)),
        points: Number(Math.round((Math.log(odd) * 25) / 5)),
      });
    }
  }

  return scores;
}
