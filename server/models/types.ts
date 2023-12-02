import {
  type ColumnType,
  type Selectable,
  type Insertable,
  type GeneratedAlways,
} from "kysely";

export interface Database {
  github_installation: GithubInstallationTable;
  github_installation_repository: GitHubInstallationRepositoryTable;

  // Auth.js tables
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}

export interface GithubInstallationTable {
  // installation_id
  id: number;
  app_id: number;
  target_id: number;
  // User or Organization
  target_type: "User" | "Organization";

  created_at: ColumnType<Date, Date | undefined, never>;
}

export type GithubInstallation = Selectable<GithubInstallationTable>;
export type NewGithubInstallation = Insertable<GithubInstallationTable>;

export interface GitHubInstallationRepositoryTable {
  id: number;
  installation_id: number;
  full_name: string;
  private: boolean;
}

export type GitHubInstallationRepository =
  Selectable<GitHubInstallationRepositoryTable>;
export type NewGitHubInstallationRepository =
  Insertable<GitHubInstallationRepositoryTable>;
