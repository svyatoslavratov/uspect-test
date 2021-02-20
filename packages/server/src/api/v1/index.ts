import { Router } from "express";

import testRoute from "./components/test";
import itemsRoute from "./components/items";
import authRoute from "./components/auth";

export default (): Router => {
  const app = Router();

  app.use("/test", testRoute);
  app.use("/items", itemsRoute);
  app.use("/auth", authRoute);

  return app;
};
