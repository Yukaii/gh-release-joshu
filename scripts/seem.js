import dotenv from "dotenv";
import SmeeClient from "smee-client";

dotenv.config();

const smee = new SmeeClient({
  source: process.env.WEBHOOK_PROXY_URL,
  target: "http://localhost:3000/api/events",
  logger: console,
});

smee.start();
