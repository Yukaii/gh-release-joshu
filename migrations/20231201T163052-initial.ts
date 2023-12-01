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

  // add index
  await db.schema
    .createIndex("github_installation_id_idx")
    .on("github_installation")
    .column("id")
    .execute();

  await db.schema
    .createTable("github_installation_repository")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("installation_id", "integer", (col) => col.notNull().references("github_installation.id"))
    .addColumn("full_name", "text", (col) => col.notNull())
    .addColumn("private", "boolean", (col) => col.notNull())
    .execute();

  // add index
  await db.schema
    .createIndex("github_installation_repository_id_idx")
    .on("github_installation_repository")
    .column("id")
    .execute();

  await db.schema
    .createIndex("github_installation_repository_full_name_idx")
    .on("github_installation_repository")
    .column("full_name")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE github_installation_repository DROP CONSTRAINT github_installation_repository_pkey;`.execute(db);
  await db.schema.dropTable("github_installation_repository").execute();

  await sql`ALTER TABLE github_installation DROP CONSTRAINT github_installation_pkey;`.execute(db);
  await db.schema.dropTable("github_installation").execute();
}
