// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],
  runtimeConfig: {
    githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY,
    appId: process.env.GITHUB_APP_ID,
    developmentInstallationId:
      process.env.GITHUB_APP_DEVELOPMENT_INSTALLATION_ID,
    webhookSecret: process.env.GITHUB_APP_WEBHOOK_SECRET,
    db: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
});
