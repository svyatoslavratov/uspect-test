import { Router, Request, Response, NextFunction } from "express";

import { AuthController } from "./controller";
import { withAuth } from "middlewares/auth";

const route = Router();

route.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new AuthController();
    try {
      const response = await controller.signUp(req.body);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new AuthController();
    try {
      const response = await controller.signIn(req.body);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.get(
  "/me",
  withAuth({ unconfirmedEmail: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new AuthController();
    try {
      const response = await controller.me(req);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.post(
  "/logout",
  withAuth({ unconfirmedEmail: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new AuthController();
    try {
      await controller.logout(req);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
