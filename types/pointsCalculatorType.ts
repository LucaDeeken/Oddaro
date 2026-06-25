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
