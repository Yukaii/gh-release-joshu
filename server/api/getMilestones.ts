import type { Octokit } from "octokit";
import { getOctokit } from "~/server/utils/githubApp";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    setResponseStatus(event, 401);
    return {
      message: "not login",
    };
  }

  const body = await readBody(event);

  // check body for repo name and owner
  if (!body) {
    setResponseStatus(event, 400);
    return {
      message: "No body provided",
    };
  }

  if (!body.repo || !body.owner) {
    setResponseStatus(event, 400);
    return {
      message: "No repo or owner provided",
    };
  }

  // GET ALL milestones
  let octokit: Octokit;
  try {
    octokit = await getOctokit(body.owner, body.repo);
  } catch {
    setResponseStatus(event, 404);
    return {
      message: "No valid installation found",
    };
  }

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
    milestones: data,
  };
});
