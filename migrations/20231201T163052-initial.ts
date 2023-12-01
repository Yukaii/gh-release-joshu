import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("github_installation")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("app_id", "integer", (col) => col.notNull())
    .addColumn("target_id", "integer", (col) => col.notNull())
    .addColumn("target_type", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db.schema
    .createTable("github_installation_repository")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("installation_id", "integer", (col) => col.notNull())
    .addColumn("full_name", "text", (col) => col.notNull())
    .addColumn("private", "boolean", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("github_installation").execute();
  await db.schema.dropTable("github_installation_repository").execute();
}
