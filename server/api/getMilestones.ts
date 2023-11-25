import { getOctokit } from "~/utils/githubApp";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // check body for repo name and owner
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body provided",
      }),
    };
  }

  if (!body.repo || !body.owner) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No repo or owner provided",
      }),
    };
  }

  // GET ALL milestones

  const octokit = await getOctokit(body.owner, body.repo);

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/milestones",
    {
      owner: body.owner,
      repo: body.repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  };
});
