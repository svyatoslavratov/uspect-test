import Agenda from "agenda";

import DeleteNotVerifiedUserJob from "jobs/delete-not-verified-user";

export default async ({ agenda }: { agenda: Agenda }): Promise<void> => {
  agenda.define(
    "delete_not_verified_user",
    { priority: "high", concurrency: 20 },
    new DeleteNotVerifiedUserJob().handler
  );

  await agenda.start();

  agenda.every("1 days", "delete_not_verified_user");
};
