import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import PriceHistoryController from "./price-history.controller";

export const createPriceHistoryRouter = (): Router => {
  const priceHistoryRouter = Router();

  priceHistoryRouter.get(
    EndpointsList.PRICE_HISTORY_BY_PRODUCT_ID,
    [checkRole("1"), authenticateJWT],
    PriceHistoryController.getPriceHistoryByProductId
  );

  return priceHistoryRouter;
};
