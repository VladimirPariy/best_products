import { Router } from "express";
import { tryCatch } from "../common/utils/try-catch";
import ViewController from "./view.controller";

export const createViewRouter = (): Router => {
  const viewRouter = Router();
  const instanceViewController = ViewController.getInstance();

  viewRouter.post("/", tryCatch(instanceViewController.addView));

  return viewRouter;
};
