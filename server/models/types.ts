import { type ColumnType, type Selectable, type Insertable } from "kysely";

export interface Database {
  github_installation: GithubInstallationTable
  github_installation_repository: GitHubInstallationRepositoryTable
}

export interface GithubInstallationTable {
  // installation_id
  id: ColumnType<number, number, never>
  app_id: number
  target_id: number
  // User or Organization
  target_type: "User" | "Organization"

  created_at: ColumnType<Date, Date, never>
}

export type GithubInstallation = Selectable<GithubInstallationTable>;
export type NewGithubInstallation = Insertable<GithubInstallationTable>;

export interface GitHubInstallationRepositoryTable {
  id: ColumnType<number, number, never>
  installation_id: number
  repository_id: number
  full_name: string
  private: boolean
}

export type GitHubInstallationRepository =
  Selectable<GitHubInstallationRepositoryTable>;
export type NewGitHubInstallationRepository =
  Insertable<GitHubInstallationRepositoryTable>;
