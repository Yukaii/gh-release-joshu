import { db } from "~/server/models";

const eventHandlers: Record<string, (body: any) => Promise<void>> = {
  "installation.created": async (body) => {
    console.log("installation.created", body);

    const records = await db
      .selectFrom("github_installation")
      .selectAll()
      .execute();

    console.log("records", records);
  },
};

export default eventHandlers;
