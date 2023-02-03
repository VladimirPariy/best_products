import { Router } from "express";
import ViewController from "./view.controller";

export const createViewRouter = (): Router => {
  const viewRouter = Router();

  viewRouter.post("/", ViewController.addView);

  return viewRouter;
};
