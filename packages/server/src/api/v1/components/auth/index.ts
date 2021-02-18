import { Router, Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

import { AuthController } from "./controller";
import { withAuth } from "middlewares/auth";
import { IUser } from "interfaces/IUser";
import Logger from "loaders/logger";

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
      const response = await controller.me(
        req.user as IUser & Document,
        (req.headers.authorization as string).slice(7)
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.post(
  "/logout",
  withAuth({ unconfirmedEmail: true }),
  async (req: Request, res: Response) => {
    Logger.silly(
      `User logout (clear session). User id: ${(req.user as IUser)._id}`
    );
    req.logOut();
    res.sendStatus(200);
  }
);

export default route;
