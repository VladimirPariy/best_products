import { Router } from "express";
import FavoriteProductsController from "./favorite-products.controller";

export const createFavoriteProductsRouter = (): Router => {
  const favoriteProductsRouter = Router();

  favoriteProductsRouter.get("/:id", FavoriteProductsController.getFavoriteProductsByUserId);
  favoriteProductsRouter.post("/", FavoriteProductsController.addProductIntoFavorite);
  favoriteProductsRouter.delete("/", FavoriteProductsController.removeProductFromFavorite);

  return favoriteProductsRouter;
};
