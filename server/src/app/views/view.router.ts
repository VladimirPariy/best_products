import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import ViewController from "./view.controller";

export const createViewRouter = (): Router => {
  const viewRouter = Router();

  viewRouter.post(EndpointsList.VIEW, ViewController.addView);

  return viewRouter;
};
