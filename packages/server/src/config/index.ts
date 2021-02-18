import dotenv from "dotenv";

import { IConfig } from "interfaces/IConfig";

let envPath: string;
switch (process.env.NODE_ENV) {
  case "testing":
    envPath = ".env.test";
    break;
  default:
    envPath = ".env";
    break;
}

const env = dotenv.config({ path: envPath });

if (env.error) {
  throw new Error(`${envPath} file not found`);
}

export default {
  port: process.env.PORT ? +process.env.PORT : 8000,
  dbUrl: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET
} as IConfig;
