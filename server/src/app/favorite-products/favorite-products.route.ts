import { Router } from "express";
import { EndpointsList } from "../common/enums/endpoints-list";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import FavoriteProductsController from "./favorite-products.controller";

export const createFavoriteProductsRouter = (): Router => {
  const favoriteProductsRouter = Router();

  favoriteProductsRouter.get(
    EndpointsList.FAVORITE_PRODUCTS_BY_USER_ID,
    authenticateJWT,
    FavoriteProductsController.getFavoriteProductsByUserId
  );
  favoriteProductsRouter.post(
    EndpointsList.FAVORITE_PRODUCTS,
    authenticateJWT,
    FavoriteProductsController.addProductIntoFavorite
  );
  favoriteProductsRouter.delete(
    EndpointsList.FAVORITE_PRODUCTS,
    authenticateJWT,
    FavoriteProductsController.removeProductFromFavorite
  );

  return favoriteProductsRouter;
};
