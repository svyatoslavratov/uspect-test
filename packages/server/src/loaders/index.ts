import { Application } from "express";

import { IConfig } from "interfaces/IConfig";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({
  app,
  config
}: {
  app: Application;
  config: IConfig;
}): Promise<void> => {
  await mongooseLoader(config.dbUrl);
  Logger.info("Database connected.");
  await expressLoader({ app });
  Logger.info("Express loaded.");
};
