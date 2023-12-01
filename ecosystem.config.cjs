module.exports = {
  apps: [
    {
      name: "server",
      script: "pnpm dev",
    },
    {
      name: "proxy",
      script: "pnpm start-webhook-proxy",
    },
  ],
};
