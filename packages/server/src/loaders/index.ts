import { Application } from "express";

import expressLoader from "./express";

export default async ({ app }: { app: Application }): Promise<void> => {
  await expressLoader({ app });
};
