import verifySignature from "~/utils/verifySignature";

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

  console.debug("webhook proxy", body);

  return "ok";
});
