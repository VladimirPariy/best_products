import { Router } from "express";

import { EndpointsList } from "@/app/common/enums/endpoints-list";

import { createAuthRouter } from "@/app/auth/auth.router";
import { createCategoriesRouter } from "@/app/categories/categories.router";
import { createProductsRouter } from "@/app/products/product.router";
import { createUserRouter } from "@/app/users/user.router";
import { createParametersRouter } from "@/app/parameters/parameters.router";
import { createCommentsRouter } from "@/app/comments/comments.router";
import { createPriceHistoryRouter } from "@/app/price-history/price-history.router";

export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use(EndpointsList.ROOT_AUTH, createAuthRouter());
  rootRouter.use(EndpointsList.ROOT_USER, createUserRouter());
  rootRouter.use(EndpointsList.ROOT_CATEGORIES, createCategoriesRouter());
  rootRouter.use(EndpointsList.ROOT_PRODUCTS, createProductsRouter());
  rootRouter.use(EndpointsList.ROOT_PARAMETERS, createParametersRouter());
  rootRouter.use(EndpointsList.ROOT_COMMENTS, createCommentsRouter());
  rootRouter.use(EndpointsList.ROOT_PRICE_HISTORY, createPriceHistoryRouter());

  return rootRouter;
};
