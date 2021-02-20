import { Router, Request, Response } from "express";

import { TestController } from "./controller";
import { withAuth } from "middlewares/auth";
import { IUser } from "interfaces/IUser";

const route = Router();

route.get("/", (_req: Request, res: Response) => {
  const controller = new TestController();
  const response = controller.index();
  res.json(response).status(200);
});

route.get(
  "/secret",
  withAuth({ unconfirmedEmail: true }),
  (req: Request, res: Response) => {
    const controller = new TestController();
    const response = controller.secret(req);
    res.json(response).status(200);
  }
);

export default route;
