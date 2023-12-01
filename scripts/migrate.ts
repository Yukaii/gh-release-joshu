import { loadNuxtConfig } from "nuxt/kit";
import path from "path";
import fs from "fs/promises";
import {
  Migrator,
  FileMigrationProvider,
  Kysely,
} from "kysely";
import { initDialect } from "~/utils/dbUtils";
import { run } from "kysely-migration-cli";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main(): Promise<void> {
  const config = await loadNuxtConfig({});

  const dbConfig = (config.runtimeConfig as unknown as {
    db: {
      database: string
      host: string
      user: string
      port: string
    }
  }).db;

  const dialect = initDialect(dbConfig);

  const db = new Kysely<any>({
    dialect,
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      migrationFolder: path.resolve(__dirname, "../migrations"),
      path,
      fs,
    }),
  });

  run(db, migrator);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
