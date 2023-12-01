import { Octokit } from "octokit";
import { decodeBase64 } from "~/server/utils/base64";
import { createAppAuth } from "@octokit/auth-app";
import { db } from "~/server/models";

const config = useRuntimeConfig();

async function findInstallationId(
  owner: string,
  repo: string,
): Promise<number> {
  const fullName = `${owner}/${repo}`;
  const repository = await db
    .selectFrom("github_installation_repository")
    .select("installation_id")
    .where("full_name", "=", fullName)
    .executeTakeFirst();

  if (repository) {
    return repository.installation_id;
  } else {
    throw new Error(`Installation not found for repository ${fullName}`);
  }
}

export async function getOctokit(
  owner: string,
  repo: string,
): Promise<Octokit> {
  const installationOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: config.appId,
      privateKey: decodeBase64(config.githubAppPrivateKey),
      installationId: await findInstallationId(owner, repo),
    },
  });

  return installationOctokit;
}
