import { Job } from "agenda";

import Logger from "loaders/logger";
import UserModel from "models/user";

export default class DeleteNotVerifiedUserJob {
  public async handler(
    job: Job,
    done: (err?: Error | undefined) => void
  ): Promise<void> {
    try {
      Logger.debug("'delete_not_verified_user' job triggered!");
      const date = new Date();
      date.setDate(date.getDate() - 1);
      await UserModel.deleteMany({
        emailVerified: false,
        createdAt: { $lte: date }
      });
      done();
    } catch (e) {
      Logger.error("Error with 'delete_not_verified_user' job: %o", e);
      done(e);
    }
  }
}
