import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

import { IError } from "../interfaces/IError";
import V1Routes from "../api/v1";

export default ({ app }: { app: Application }): void => {
  app.use(express.static("public"));

  app.use(bodyParser.json());

  app.get("/api/status", (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json"
      }
    })
  );

  app.use("/api/v1", V1Routes());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: IError = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
};
