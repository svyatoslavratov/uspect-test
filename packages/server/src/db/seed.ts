import config from "config";
import mongooseLoader from "loaders/mongoose";
import ItemModel from "models/item";
import { IItem } from "interfaces/IItem";
import Logger from "loaders/logger";

const generate = async () => {
  Logger.info("Seed generation started.");
  const connection = await mongooseLoader(config.dbUrl);

  Logger.silly("Creation ItemModel...");
  for (let i = 0; i < 100; i++) {
    await ItemModel.create(await generateItem());
  }
  Logger.silly("Completed ItemModel creation.");

  connection.disconnect();
  Logger.info("Seed generation completed.");
};

generate();

// helpers

const generateItem = async (): Promise<IItem> => {
  const namesFirstPart = [
    "Galaxy",
    "Apple",
    "Sumsung",
    "Huawei",
    "Toshiba",
    "Mi"
  ];
  const namesSecondPart = ["S", "ES", "ULTRA", "Super", "GT"];

  let name = `${getRandomArrayItem(namesFirstPart)} ${getRandomArrayItem(
    namesSecondPart
  )}`;

  if (getRandomInt) {
    name = `${name} ${getRandomInt(10) + 1}`;
  }

  const priceMarketingPart = [99, 249, 999, 449, 889];
  const price =
    (getRandomInt(100) + 1) * 1000 + getRandomArrayItem(priceMarketingPart);

  const count = getRandomInt(1000);

  return {
    count,
    price,
    name
  } as IItem;
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomArrayItem = <T>(array: Array<T>) =>
  array[getRandomInt(array.length)];
