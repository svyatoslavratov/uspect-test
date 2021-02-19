import { Application } from "express";

import { IConfig } from "interfaces/IConfig";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import passportLoader from "./passport";
import agendaLoader from "./agenda";
import jobsLoader from "./jobs";

export default async ({
  app,
  config
}: {
  app: Application;
  config: IConfig;
}): Promise<void> => {
  console.log("CONFIG LOADER", config, JSON.stringify(config));
  const mongooseCoonection = await mongooseLoader(config.dbUrl);
  Logger.info("Database connected.");

  const agendaInstance = agendaLoader({
    mongoConnection: mongooseCoonection.connection.db,
    dbCollection: config.agenda.dbCollection,
    pooltime: config.agenda.pooltime
  });
  Logger.info("Agenda settings complete.");

  await jobsLoader({ agenda: agendaInstance });

  passportLoader(config.jwtSecret);
  Logger.info("Passport settings complete.");

  await expressLoader({ app, config });
  Logger.info("Express loaded.");
};
