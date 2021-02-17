import { Router, Request, Response, NextFunction } from "express";

import { ItemsController } from "./controller";

const route = Router();

route.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new ItemsController();
  try {
    const page = req.query?.page;
    const limit = req.query?.limit;
    const response = await controller.getAll(
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

route.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new ItemsController();
  try {
    const response = await controller.getById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

route.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new ItemsController();
  try {
    const response = await controller.create(req.body);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
});

route.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new ItemsController();
  try {
    const response = await controller.update(req.params.id, req.body);
    res.status(202).json(response);
  } catch (e) {
    next(e);
  }
});

route.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new ItemsController();
    try {
      const response = await controller.delete(req.params.id);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
);

export default route;
