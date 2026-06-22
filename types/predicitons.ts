export type Prediction = {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  homeGoals: number | null;
  awayGoals: number | null;
};

export type Predictions = Record<string, Prediction>;
