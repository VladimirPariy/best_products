import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import ViewController from "@/app/views/view.controller";

export const createViewRouter = (): Router => {
  const viewRouter = Router();

  viewRouter.post(EndpointsList.VIEW, ViewController.addView);

  return viewRouter;
};
