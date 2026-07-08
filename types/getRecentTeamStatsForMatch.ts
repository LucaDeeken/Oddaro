export type MatchRow = {
  id: number;
  season_id: number;
  kickoff: string;
  home_team_id: number;
  away_team_id: number;
  home_goals: number | null;
  away_goals: number | null;
  is_finished: boolean;
};

export type HomeStats = {
  home_games: number;
  home_goals_for: number;
  home_goals_against: number;
};

export type AwayStats = {
  away_games: number;
  away_goals_for: number;
  away_goals_against: number;
};
