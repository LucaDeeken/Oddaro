export type Match = {
  matchday: string;
  home_team: string;
  away_team: string;
  home_goals: number | null;
  away_goals: number | null;
  kickoff: string | null;
  is_finished: boolean | null;
};

export type League = {
  name: string;
  type: string;
  country: string;
};

export type Season = {
  year: number | string;
};

export type SeasonJson = {
  league: League;
  season: Season;
  matches: Match[];
};
