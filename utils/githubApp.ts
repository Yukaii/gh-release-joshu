import { App } from "octokit"
import { decodeBase64 } from "~/utils/base64"

const config = useRuntimeConfig()

const app = new App({
  appId: config.appId,
  privateKey: decodeBase64(config.githubAppPrivateKey),
});

export default app