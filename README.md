# gh-release-joshu

TBD: Yet another cool open source project.

## Setup

```bash
# npm
pnpm install
cp .env.example .env
```

## Config

Fill the `.env` file with your own config.

```bash
# GitHub App related config
WEBHOOK_PROXY_URL=https://smee.io/xxxxxx
GITHUB_APP_PRIVATE_KEY=base64 encoded private key: cat private-key.pem | base64 -b 0
GITHUB_APP_ID=
GITHUB_APP_DEVELOPMENT_INSTALLATION_ID=
```

* For `WEBHOOK_PROXY_URL`, you can use [smee.io](https://smee.io/) to create a webhook proxy.
* For GitHub App, you can create one in GitHub App. You'll need to fill `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_ID`
* For `GITHUB_APP_DEVELOPMENT_INSTALLATION_ID`, once you install the GitHub App to your repo, you can get the installation id.

```bash
# Database related config
DB_DATABASE=release_joshu
DB_HOST=127.0.0.1
DB_USER=
DB_PORT=5432
DB_PASSWORD=
```

## Development Server

```bash
# npm
pnpm run dev
pnpm start-webhook-proxy
```

