import pg from "pg";
import { PostgresDialect } from "kysely";

export function initDialect(
  dbConfig: {
    database: string;
    host: string;
    user: string;
    port: string;
  },
  max: number | undefined = undefined,
): PostgresDialect {
  return new PostgresDialect({
    pool: new pg.Pool({
      database: dbConfig.database,
      host: dbConfig.host,
      user: dbConfig.user,
      port: parseInt(dbConfig.port, 10),
      max,
    }),
  });
}
