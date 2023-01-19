import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import { checkRole } from "@/app/common/middlewares/role-middleware";
import PriceHistoryController from "@/app/price-history/price-history.controller";

export const createPriceHistoryRouter = (): Router => {
  const priceHistoryRouter = Router();

  priceHistoryRouter.get(
    EndpointsList.PRICE_HISTORY_BY_PRODUCT_ID,
    [checkRole("1"), authenticateJWT],
    PriceHistoryController.getPriceHistoryByProductId
  );

  return priceHistoryRouter;
};
