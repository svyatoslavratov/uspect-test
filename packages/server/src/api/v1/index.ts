import { Router } from "express";

import helloRoute from "./components/hello";

export default (): Router => {
  const app = Router();

  app.use("/hello", helloRoute);

  return app;
};
