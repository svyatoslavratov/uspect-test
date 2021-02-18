import { Application } from "express";

import { IConfig } from "interfaces/IConfig";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import passportLoader from "./passport";

export default async ({
  app,
  config
}: {
  app: Application;
  config: IConfig;
}): Promise<void> => {
  await mongooseLoader(config.dbUrl);
  Logger.info("Database connected.");
  passportLoader(config.jwtSecret);
  Logger.info("Passport settings complete.");
  await expressLoader({ app, config });
  Logger.info("Express loaded.");
};
