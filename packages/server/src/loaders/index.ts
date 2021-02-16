import { Application } from "express";

import { IConfig } from "interfaces/IConfig";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({
  app,
  config
}: {
  app: Application;
  config: IConfig;
}): Promise<void> => {
  await mongooseLoader(config.dbUrl);
  await expressLoader({ app });
};
