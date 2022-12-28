import { Router } from "express";

import { EndpointsList } from "@/app/common/enums/endpoints-list";

import { createAuthRouter } from "@/app/auth/auth.router";
import { createCategoriesRouter } from "@/app/categories/categories.router";
import { createProductsRouter } from "@/app/products/product.router";
import { createUserRouter } from "@/app/users/user.router";

export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use(EndpointsList.ROOT_AUTH, createAuthRouter());
  rootRouter.use(EndpointsList.ROOT_USER, createUserRouter());
  rootRouter.use(EndpointsList.ROOT_CATEGORIES, createCategoriesRouter());
  rootRouter.use(EndpointsList.ROOT_PRODUCTS, createProductsRouter());

  return rootRouter;
};
