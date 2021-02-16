import config from "config";
import mongooseLoader from "loaders/mongoose";
import ItemModel from "models/item";
import { IItem } from "interfaces/IItem";

const generate = async () => {
  console.log("Seed generation started.");
  const connection = await mongooseLoader(config.dbUrl);

  console.log("Creation ItemModel...");
  for (let i = 0; i < 100; i++) {
    await ItemModel.create(await generateItem());
  }
  console.log("\x1b[32m", "Completed ItemModel creation.");

  connection.disconnect();
  console.log("\x1b[32m", "Seed generation completed.");
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
    getRandomInt(100000) + 1000 + getRandomArrayItem(priceMarketingPart);

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
