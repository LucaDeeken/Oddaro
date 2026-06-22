export type Outcome = {
  name: string;
  price: number;
};

export type Market = {
  outcomes: Outcome[];
};

export type Bookmaker = {
  markets: Market[];
};

export type Match = {
  home_team: string;
  away_team: string;
  bookmakers?: Bookmaker[];
};

export function getHeadToHeadPoints(
  match: Match,
  homeGoals: number | null,
  awayGoals: number | null,
) {
  if (homeGoals === null || awayGoals === null) return 0;

  const outcomes = match.bookmakers?.[0]?.markets?.[0]?.outcomes;

  if (!outcomes) return 0;

  let chosenPrediction: Outcome | undefined;
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

  if (chosenPrediction !== undefined) {
    return Math.round(chosenPrediction.price * 3);
  }
}
