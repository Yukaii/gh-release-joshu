import verifySignature from "~/utils/verifySignature";
import eventHandlers from "../githubEventHandler";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  const signature = headers["x-hub-signature-256"] ?? "";
  const isValid = verifySignature(config.webhookSecret, body, signature);

  if (!isValid) {
    setResponseStatus(event, 401);
    return "Unauthorized";
  }

  const eventType = headers["x-github-event"] ?? "";
  const { action = "" } = body;

  if (!eventType || !action) {
    setResponseStatus(event, 400);
    return "Missing event type or action";
  }

  const eventName = `${eventType}.${action}`;
  console.debug(`Received event: ${eventName}`);
  const eventHandler = eventHandlers[eventName];
  if (!eventHandler) {
    return "No event handler found";
  }

  eventHandler(body).catch((err: Error) => {
    console.error(err);
  });

  return "ok";
});
