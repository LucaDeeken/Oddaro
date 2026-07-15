type AdjustExpectedGoalsParams = {
  expectedHomeGoals: number;
  expectedAwayGoals: number;
  homeOdd: number;
  drawOdd: number;
  awayOdd: number;
  strengthFactor?: number;
};

export function adjustExpectedGoalsByH2H({
  expectedHomeGoals,
  expectedAwayGoals,
  homeOdd,
  drawOdd,
  awayOdd,
  strengthFactor = 0.15,
}: AdjustExpectedGoalsParams) {
  // Implizite Wahrscheinlichkeiten aus Quoten
  let homeProb = 1 / homeOdd;
  let drawProb = 1 / drawOdd;
  let awayProb = 1 / awayOdd;

  // Buchmacher-Marge entfernen
  const total = homeProb + drawProb + awayProb;

  homeProb /= total;
  drawProb /= total;
  awayProb /= total;

  // Verhältnis der Teamstärke aus Marktmeinung
  // > 1 bedeutet: Auswärtsteam stärker
  const strengthRatio = awayProb / homeProb;

  // Abschwächung, damit Markt nicht alles überschreibt
  const factor = Math.pow(strengthRatio, strengthFactor);

  return {
    expectedHomeGoals: expectedHomeGoals / factor,

    expectedAwayGoals: expectedAwayGoals * factor,

    marketProbabilities: {
      home: homeProb,
      draw: drawProb,
      away: awayProb,
    },

    adjustmentFactor: factor,
  };
}
