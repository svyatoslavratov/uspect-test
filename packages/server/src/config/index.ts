import dotenv from "dotenv";

const env = dotenv.config();

if (env.error) {
  throw new Error(".env file not found");
}

export default {
  port: process.env.PORT ? +process.env.PORT : 8000,
  dbUrl: process.env.MONGODB_URI || ""
};
