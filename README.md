# gh-release-joshu

TBD: Yet another cool open source project.

## Setup

```bash
# npm
pnpm install
cp .env.example .env
```

## Config

There're four config in `.env` file:

```bash
WEBHOOK_PROXY_URL=https://smee.io/xxxxxx
GITHUB_APP_PRIVATE_KEY=base64 encoded private key: cat private-key.pem | base64 -b 0
GITHUB_APP_ID=
GITHUB_APP_DEVELOPMENT_INSTALLATION_ID=
```

* For `WEBHOOK_PROXY_URL`, you can use [smee.io](https://smee.io/) to create a webhook proxy.
* For GitHub App, you can create one in GitHub App. You'll need to fill `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_ID`
* For `GITHUB_APP_DEVELOPMENT_INSTALLATION_ID`, once you install the GitHub App to your repo, you can get the installation id.

## Development Server

```bash
# npm
pnpm run dev
pnpm start-webhook-proxy
```

