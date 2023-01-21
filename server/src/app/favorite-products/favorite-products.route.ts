import { Router } from "express";
import { EndpointsList } from "@/app/common/enums/endpoints-list";
import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import FavoriteProductsController from "@/app/favorite-products/favorite-products.controller";

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
