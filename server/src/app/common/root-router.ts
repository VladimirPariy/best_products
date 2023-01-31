import { Router } from "express";

import { EndpointsList } from "./enums/endpoints-list";

import { createAuthRouter } from "../auth/auth.router";
import { createCategoriesRouter } from "../categories/categories.router";
import { createProductsRouter } from "../products/product.router";
import { createUserRouter } from "../users/user.router";
import { createParametersRouter } from "../parameters/parameters.router";
import { createCommentsRouter } from "../comments/comments.router";
import { createPriceHistoryRouter } from "../price-history/price-history.router";
import { createFavoriteProductsRouter } from "../favorite-products/favorite-products.route";
import { createCharacteristicsRouter } from "../characteristics/characteristic.router";
import { createViewRouter } from "../views/view.router";
import { createFeedbacksRouter } from "../feedbacks/feedbacks.router";
import { createStatisticsRouter } from "../statistics/statistics.router";

export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use(EndpointsList.ROOT_AUTH, createAuthRouter());
  rootRouter.use(EndpointsList.ROOT_USER, createUserRouter());
  rootRouter.use(EndpointsList.ROOT_CATEGORIES, createCategoriesRouter());
  rootRouter.use(EndpointsList.ROOT_PRODUCTS, createProductsRouter());
  rootRouter.use(EndpointsList.ROOT_PARAMETERS, createParametersRouter());
  rootRouter.use(EndpointsList.ROOT_COMMENTS, createCommentsRouter());
  rootRouter.use(EndpointsList.ROOT_PRICE_HISTORY, createPriceHistoryRouter());
  rootRouter.use(
    EndpointsList.ROOT_FAVORITE_PRODUCTS,
    createFavoriteProductsRouter()
  );
  rootRouter.use(
    EndpointsList.ROOT_CHARACTERISTICS,
    createCharacteristicsRouter()
  );
  rootRouter.use(EndpointsList.ROOT_VIEW, createViewRouter());
  rootRouter.use(EndpointsList.ROOT_FEEDBACK, createFeedbacksRouter());
  rootRouter.use(EndpointsList.ROOT_STATISTICS, createStatisticsRouter());

  return rootRouter;
};
