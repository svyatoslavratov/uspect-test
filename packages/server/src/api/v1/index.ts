import { Router } from "express";

import helloRoute from "./components/hello";
import itemsRoute from "./components/items";

export default (): Router => {
  const app = Router();

  app.use("/hello", helloRoute);
  app.use("/items", itemsRoute);

  return app;
};
