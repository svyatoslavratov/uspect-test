import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

import V1Routes from "../api/v1";
import Logger from "./logger";
import { IConfig } from "interfaces/IConfig";
import { IError } from "interfaces/IError";

export default ({
  app,
  config
}: {
  app: Application;
  config: IConfig;
}): void => {
  app.use(helmet());

  app.use(express.static("public"));

  app.use(
    session({
      secret: config.sessionSecret,
      saveUninitialized: false,
      resave: false
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    morgan("tiny", {
      stream: {
        write: (text: string) => {
          Logger.http(text);
        }
      }
    })
  );

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

  app.use((err: IError, _req: Request, res: Response, next: NextFunction) => {
    const response = {
      status: err.status || 500,
      body: {
        name: err.name,
        message: err.message,
        status: err.status
      }
    };

    switch (err.name) {
      case "CastError":
        response.status = 400;
        response.body.message = "Invalid parameter";
        break;

      case "ValidationError":
        response.status = 400;
        break;
    }

    res.status(response.status).json(response.body);

    next(err);
  });
};
