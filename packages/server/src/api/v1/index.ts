import { Router } from "express";

import hello from "./routes/hello";

export default (): Router => {
  const app = Router();

  hello(app);

  return app;
};
