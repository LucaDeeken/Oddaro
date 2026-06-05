export type Match = {
  id: number;
  home: string;
  away: string;
  league?: string;
  kickoff?: string;
};

export const matches: Match[] = [
  {
    id: 1,
    home: "Bayern München",
    away: "Borussia Dortmund",
    league: "Bundesliga",
    kickoff: "20:30",
  },
  {
    id: 2,
    home: "RB Leipzig",
    away: "Bayer Leverkusen",
    league: "Bundesliga",
    kickoff: "18:30",
  },
  {
    id: 3,
    home: "Real Madrid",
    away: "Barcelona",
    league: "La Liga",
    kickoff: "21:00",
  },
];
