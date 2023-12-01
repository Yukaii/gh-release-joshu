import { loadNuxt } from "nuxt/kit";
import path from "path";
import fs from "fs/promises";
import {
  Migrator,
  FileMigrationProvider,
  Kysely,
  PostgresDialect,
} from "kysely";
import pg from "pg";
import { run } from "kysely-migration-cli";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main(): Promise<void> {
  const nuxt = await loadNuxt({});

  const dbConfig = (nuxt.options.runtimeConfig as unknown as {
    db: {
      database: string
      host: string
      user: string
      port: string
    }
  }).db;

  const dialect = new PostgresDialect({
    pool: new pg.Pool({
      database: dbConfig.database,
      host: dbConfig.host,
      user: dbConfig.user,
      port: parseInt(dbConfig.port, 10),
    }),
  });

  const db = new Kysely<any>({
    dialect,
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      migrationFolder: path.resolve(__dirname, "./migrations"),
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
