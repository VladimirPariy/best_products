import { Router } from "express";
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
import { Roles } from "./enums/Roles";
import { checkRole } from "./middlewares/role-middleware";
import { authenticateJWT } from "./middlewares/auth-middleware";

export const createRootRouter = (): Router => {
  const rootRouter = Router();

  rootRouter.use("/auth", createAuthRouter());
  rootRouter.use("/user", authenticateJWT, createUserRouter());
  rootRouter.use("/products", createProductsRouter());
  rootRouter.use("/categories", createCategoriesRouter());
  rootRouter.use("/parameters", createParametersRouter());
  rootRouter.use("/comments", createCommentsRouter());
  rootRouter.use("/history", [checkRole(Roles.Admin), authenticateJWT], createPriceHistoryRouter());
  rootRouter.use("/favorite", authenticateJWT, createFavoriteProductsRouter());
  rootRouter.use("/view", createViewRouter());
  rootRouter.use("/feedbacks", authenticateJWT, createFeedbacksRouter());
  rootRouter.use(
    "/characteristics",
    [checkRole(Roles.Admin), authenticateJWT],
    createCharacteristicsRouter()
  );
  rootRouter.use(
    "/statistics",
    [checkRole(Roles.Admin), authenticateJWT],
    createStatisticsRouter()
  );

  return rootRouter;
};
