import { getSeasonStats } from "@/lib/matchesApi";
import {
  Match,
  League,
  Season,
  SeasonJson,
} from "@/types/importMatchesDataType";
import { runImport } from "@/lib/db/runImport";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

//Nutzt den API Call, um die gesamte Saison zu fetchen und baut aus ihr die drei Objekte League, Season und Matches zusammen.
//Hier werden nun dem Vorbild der Datenbank entsprechend die benötigten Felder gefüllt.
//Der Returnwert entspricht allen benötigten Feldern in einer gesammelten JSON.
async function buildJsonFromSeasonStats(): Promise<SeasonJson> {
  const data = await getSeasonStats();

  const league: League = {
    name: data?.competition?.name ?? "",
    type: data?.competition?.type ?? "",
  };

  const season: Season = {
    year: data?.filters?.season ?? "",
  };

  const matchesFiltered: Match[] = [];

  const matches = data?.matches ?? [];
  for (let i = 0; i < matches.length; i++) {
    const singleMatch: Match = {
      matchday: matches[i].matchday,
      home_team: matches[i].homeTeam.name,
      away_team: matches[i].awayTeam.name,
      home_goals: matches[i].score.fullTime.home,
      away_goals: matches[i].score.fullTime.away,
      kickoff: matches[i].utcDate,
    };
    matchesFiltered.push(singleMatch);
  }

  const finalJson: SeasonJson = {
    league: league,
    season: season,
    matches: matchesFiltered,
  };

  return finalJson;
}

async function main() {
  const finalJson = await buildJsonFromSeasonStats();

  await runImport(finalJson);
}

main().catch(console.error);
