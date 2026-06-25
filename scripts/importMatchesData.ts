import { getSeasonStats } from "@/lib/matchesApi";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const data = await getSeasonStats();
  debugger;

  console.log(data);
}

main().catch(console.error);
