// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    githubAppPrivateKey: process.env.GITHUB_APP_PRIVATE_KEY,
    appId: process.env.GITHUB_APP_ID,
    developmentInstallationId: process.env.GITHUB_APP_DEVELOPMENT_INSTALLATION_ID,
  }
})
