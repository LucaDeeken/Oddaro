export type Match = {
  id: number;
  home: string;
  away: string;
  league: string;
  kickoff: string;
  date: string;
};

export const matches: Match[] = [
  {
    id: 1,
    home: "Bayern München",
    away: "Borussia Dortmund",
    league: "Bundesliga",
    kickoff: "18:30",
    date: "2026-06-05",
  },
  {
    id: 2,
    home: "RB Leipzig",
    away: "Bayer Leverkusen",
    league: "Bundesliga",
    kickoff: "15:30",
    date: "2026-06-05",
  },
  {
    id: 3,
    home: "Eintracht Frankfurt",
    away: "SC Freiburg",
    league: "Bundesliga",
    kickoff: "15:30",
    date: "2026-06-05",
  },
  {
    id: 4,
    home: "VfL Wolfsburg",
    away: "Union Berlin",
    league: "Bundesliga",
    kickoff: "15:30",
    date: "2026-06-05",
  },
  {
    id: 5,
    home: "Borussia Mönchengladbach",
    away: "1. FC Köln",
    league: "Bundesliga",
    kickoff: "18:30",
    date: "2026-06-05",
  },
  {
    id: 6,
    home: "Hoffenheim",
    away: "FSV Mainz 05",
    league: "Bundesliga",
    kickoff: "15:30",
    date: "2026-06-06",
  },
  {
    id: 7,
    home: "Werder Bremen",
    away: "FC Augsburg",
    league: "Bundesliga",
    kickoff: "15:30",
    date: "2026-06-06",
  },
  {
    id: 8,
    home: "VfB Stuttgart",
    away: "FC Schalke 04",
    league: "Bundesliga",
    kickoff: "18:30",
    date: "2026-06-06",
  },
  {
    id: 9,
    home: "1. FC Heidenheim",
    away: "Hamburger SV",
    league: "Bundesliga",
    kickoff: "20:30",
    date: "2026-06-06",
  },
];
