import { db } from "~/server/models";
import { type InstallationCreatedEvent } from "@octokit/webhooks-types";

const installationCreatedEvent = async (
  event: InstallationCreatedEvent,
): Promise<void> => {
  await db
    .insertInto("github_installation")
    .values({
      id: event.installation.id,
      app_id: event.installation.app_id,
      target_id: event.installation.target_id,
      target_type: event.installation.target_type,
    })
    .onConflict(oc => oc
      .column("id")
      .doUpdateSet({
        app_id: event.installation.app_id,
        target_id: event.installation.target_id,
        target_type: event.installation.target_type,
      }))
    .executeTakeFirst();

  // delete repositories created event treat as installation created
  await db.deleteFrom("github_installation_repository")
    .where("installation_id", "=", event.installation.id)
    .execute();

  for (const repository of event.repositories ?? []) {
    await db
      .insertInto("github_installation_repository")
      .values({
        id: repository.id,
        installation_id: event.installation.id,
        full_name: repository.full_name,
        private: repository.private,
      })
      .onConflict(oc => oc
        .column("id")
        .doUpdateSet({
          full_name: repository.full_name,
          private: repository.private,
        }))
      .execute();
  }
};

const eventHandlers: Record<string, (body: any) => Promise<void>> = {
  "installation.created": installationCreatedEvent,
};

export default eventHandlers;
