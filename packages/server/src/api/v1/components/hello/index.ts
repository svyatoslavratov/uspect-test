import { Router, Request, Response } from "express";

import { HelloController } from "./controller";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  const controller = new HelloController();
  const response = controller.index();
  res.json(response).status(200);
});

export default route;
