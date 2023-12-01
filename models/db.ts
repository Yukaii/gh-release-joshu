import { Database } from './types' // this is the Database interface we defined earlier
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const config = useRuntimeConfig();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.db.database,
    host: config.db.host,
    user: config.db.user,
    port: config.db.port,
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})

