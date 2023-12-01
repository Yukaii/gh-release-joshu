import { type ColumnType, type Selectable, type Insertable } from "kysely";

export interface Database {
  github_installation: GithubInstallationTable
  github_installation_repository: GitHubInstallationRepositoryTable
}

export interface GithubInstallationTable {
  // installation_id
  id: number
  app_id: number
  target_id: number
  // User or Organization
  target_type: "User" | "Organization"

  created_at: ColumnType<Date, Date | undefined, never>
}

export type GithubInstallation = Selectable<GithubInstallationTable>;
export type NewGithubInstallation = Insertable<GithubInstallationTable>;

export interface GitHubInstallationRepositoryTable {
  id: number
  installation_id: number
  full_name: string
  private: boolean
}

export type GitHubInstallationRepository =
  Selectable<GitHubInstallationRepositoryTable>;
export type NewGitHubInstallationRepository =
  Insertable<GitHubInstallationRepositoryTable>;
