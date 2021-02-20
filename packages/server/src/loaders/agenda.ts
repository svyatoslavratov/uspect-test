import Agenda from "agenda";
import { Db } from "mongodb";

export default ({
  mongoConnection,
  dbCollection,
  pooltime
}: {
  mongoConnection: Db;
  dbCollection: string;
  pooltime: string;
}): Agenda => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: dbCollection },
    processEvery: pooltime
  });
};
