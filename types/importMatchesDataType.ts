export type Match = {
  matchday: number;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
  kickoff: string;
};

export type League = {
  name: string;
  type: string;
};

export type Season = {
  year: number | string;
};

export type SeasonJson = {
  league: League;
  season: Season;
  matches: Match[];
};
