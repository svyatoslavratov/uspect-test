import { Application, Request, Response, NextFunction } from "express";

import { IError } from "../interfaces/IError";
import V1Routes from "../api/v1";

export default ({ app }: { app: Application }): void => {
  app.get("/status", (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.use("/api/v1", V1Routes());
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: IError = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
};
