import { Octokit } from "octokit"
import { decodeBase64 } from "~/utils/base64"
import { createAppAuth } from "@octokit/auth-app"

const config = useRuntimeConfig()

// TODO: find installation from database with owner/repo
async function findInstallationId (owner: string, repo: string) {
  return config.developmentInstallationId
}

export async function getOctokit (owner: string, repo: string) {
  const installationOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: config.appId,
      privateKey: decodeBase64(config.githubAppPrivateKey),
      installationId: await findInstallationId(owner, repo),
    },
  });


  return installationOctokit
}
