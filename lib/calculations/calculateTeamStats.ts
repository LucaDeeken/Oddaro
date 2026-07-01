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
    if (!allTeams[matches[i].home_team_id]) {
      allTeams[matches[i].home_team_id] = createNewTeam();
    }

    if (!allTeams[matches[i].away_team_id]) {
      allTeams[matches[i].away_team_id] = createNewTeam();
    }

    allTeams[matches[i].home_team_id].homeGames += 1;
    allTeams[matches[i].home_team_id].homeGoalsFor += matches[i].home_goals;
    allTeams[matches[i].home_team_id].homeGoalsAgainst += matches[i].away_goals;

    allTeams[matches[i].away_team_id].awayGames += 1;
    allTeams[matches[i].away_team_id].awayGoalsFor += matches[i].away_goals;
    allTeams[matches[i].away_team_id].awayGoalsAgainst += matches[i].home_goals;
  }
  return allTeams;
}
