import { Router } from "express";
import PriceHistoryController from "./price-history.controller";

export const createPriceHistoryRouter = (): Router => {
  const priceHistoryRouter = Router();

  priceHistoryRouter.get("/:id", PriceHistoryController.getPriceHistoryByProductId);

  return priceHistoryRouter;
};
