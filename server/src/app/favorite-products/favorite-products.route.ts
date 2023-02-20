import { Router } from "express";
import FavoriteProductsController from "./favorite-products.controller";
import { tryCatch } from "../common/utils/try-catch";

export const createFavoriteProductsRouter = (): Router => {
  const favoriteProductsRouter = Router();

  const instanceFavoriteProductsController = FavoriteProductsController.getInstance();

  favoriteProductsRouter.get(
    "/:id",
    tryCatch(instanceFavoriteProductsController.getFavoriteProductsByUserId)
  );
  favoriteProductsRouter.post(
    "/",
    tryCatch(instanceFavoriteProductsController.addProductIntoFavorite)
  );
  favoriteProductsRouter.delete(
    "/",
    tryCatch(instanceFavoriteProductsController.removeProductFromFavorite)
  );

  return favoriteProductsRouter;
};
