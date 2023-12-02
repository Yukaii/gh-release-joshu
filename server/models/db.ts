import { KyselyAuth } from "@auth/kysely-adapter";

import { type Database } from "./types";
import { initDialect } from "~/utils/dbUtils";

const config = useRuntimeConfig();

const dialect = initDialect(config.db, 10);

export const db = new KyselyAuth<Database>({
  dialect,
});
