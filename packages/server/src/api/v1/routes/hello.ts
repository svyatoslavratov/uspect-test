import { Router, Request, Response } from "express";

const route = Router();

export default (app: Router): void => {
  app.use("/hello", route);

  route.get("/", (req: Request, res: Response) => {
    return res.json({ text: "hello" }).status(200);
  });
};
