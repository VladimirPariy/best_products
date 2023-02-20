import { Router } from "express";
import { tryCatch } from "../common/utils/try-catch";
import PriceHistoryController from "./price-history.controller";

export const createPriceHistoryRouter = (): Router => {
  const priceHistoryRouter = Router();

  const instancePriceHistoryController = PriceHistoryController.getInstance();

  priceHistoryRouter.get(
    "/:id",
    tryCatch(instancePriceHistoryController.getPriceHistoryByProductId)
  );

  return priceHistoryRouter;
};
