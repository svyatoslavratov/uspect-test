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
  console.warn(`Warn: ${envPath} file not found`);
}

const email: { user?: string; pass?: string; host?: string; send?: boolean } = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  send: false
};

switch (process.env.NODE_ENV) {
  case "testing":
    email.pass = "supersecret";
    email.user = "ethereal.user@ethereal.email";
    email.host = "smtp.ethereal.email";
    break;

  case "production":
    email.send = true;
    break;
  default:
    break;
}

export default {
  port: process.env.PORT ? +process.env.PORT : 8000,
  dbUrl: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  email,
  agenda: {
    dbCollection: "agenda",
    pooltime: "1000"
  }
} as IConfig;
