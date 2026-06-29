import { TeamStats } from "@/types/teamStats";

function createNewTeam() {
  return {
    homeGames: 0,
    awayGames: 0,
    homeGoalsFor: 0,
    homeGoalsAgainst: 0,
    awayGoalsFor: 0,
    awayGoalsAgainst: 0,
  };
}
export function calculateTeamStats(matches) {
  const allTeams: Record<string, TeamStats> = {};

  for (let i = 0; i < matches.length; i++) {
    if (!allTeams[matches[i].home_team]) {
      allTeams[matches[i].home_team] = createNewTeam();
    }

    if (!allTeams[matches[i].away_team]) {
      allTeams[matches[i].away_team] = createNewTeam();
    }

    allTeams[matches[i].home_team].homeGames += 1;
    allTeams[matches[i].home_team].homeGoalsFor += matches[i].home_goals;
    allTeams[matches[i].home_team].homeGoalsAgainst += matches[i].away_goals;

    allTeams[matches[i].away_team].awayGames += 1;
    allTeams[matches[i].away_team].awayGoalsFor += matches[i].away_goals;
    allTeams[matches[i].away_team].awayGoalsAgainst += matches[i].home_goals;
  }
  return allTeams;
}
