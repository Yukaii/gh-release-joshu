export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.debug("webhook proxy", body);

  return {
    statusCode: 200,
  };
});
