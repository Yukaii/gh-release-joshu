import { type Kysely, sql } from "kysely";

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
    .createIndex("github_installation_target_id_idx")
    .on("github_installation")
    .column("target_id")
    .execute();

  await db.schema
    .createTable("github_installation_repository")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("installation_id", "integer", (col) =>
      col.notNull().references("github_installation.id"),
    )
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

  // Auth.js tables
  await db.schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("Account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull(),
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createTable("Session")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull(),
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .on("Session")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE github_installation_repository DROP CONSTRAINT github_installation_repository_pkey;`.execute(
    db,
  );
  await db.schema.dropTable("github_installation_repository").execute();

  await sql`ALTER TABLE github_installation DROP CONSTRAINT github_installation_pkey;`.execute(
    db,
  );
  await db.schema.dropTable("github_installation").execute();

  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();
}
