import { TeamStats } from "@/types/teamStats";

export function calculateTeamStats(matches) {
  const allTeams: Record<string, TeamStats> = {};

  for (let i = 0; i < matches.length; i++) {
    if (!allTeams[matches[i].home_team]) {
      allTeams[matches[i].home_team] = {
        homeGames: 0,
        awayGames: 0,
        homeGoalsFor: 0,
        homeGoalsAgainst: 0,
        awayGoalsFor: 0,
        awayGoalsAgainst: 0,
      };
    }
  }
}
