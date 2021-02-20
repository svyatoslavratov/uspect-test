import { Router, Request, Response, NextFunction } from "express";

import { ItemsController } from "./controller";
import { withAuth } from "middlewares/auth";

const route = Router();

route.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const controller = new ItemsController();
  try {
    const page = req.query?.page;
    const limit = req.query?.limit;
    const response = await controller.getAll(
      parseInt(page as string),
      parseInt(limit as string),
      req.query?.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
      req.query?.minPrice ? parseInt(req.query.minPrice as string) : undefined,
      req.query?.inStock === "true",
      req.query?.search as string
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

route.post(
  "/",
  withAuth({ unconfirmedEmail: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new ItemsController();
    try {
      const response = await controller.create(req.body);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.put(
  "/:id",
  withAuth({ unconfirmedEmail: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new ItemsController();
    try {
      const response = await controller.update(req.params.id, req.body);
      res.status(202).json(response);
    } catch (e) {
      next(e);
    }
  }
);

route.delete(
  "/:id",
  withAuth({ unconfirmedEmail: true }),
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
