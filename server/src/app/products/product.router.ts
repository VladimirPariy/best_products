import { Router } from "express";

import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import productController from "./product.controller";
import { Roles } from "../common/enums/Roles";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();

  productsRouter.get("/", productController.getAllProducts);
  productsRouter.get("/filter", productController.getFilteredProductsByCategory);
  productsRouter.get("/search", productController.searchProductsAndSubcategory);
  productsRouter.get("/:id", productController.getProductDetailsById);
  productsRouter.delete("/:id", [checkRole(Roles.Admin), authenticateJWT], productController.removeProduct);
  productsRouter.patch("/:id", [checkRole(Roles.Admin), authenticateJWT], productController.updateProduct);
  productsRouter.post("/", [checkRole(Roles.Admin), authenticateJWT], productController.createNewProduct);
  productsRouter.post("/temp", [checkRole(Roles.Admin), authenticateJWT], productController.uploadTempImages);
  productsRouter.delete("/temp/:id", [checkRole(Roles.Admin), authenticateJWT], productController.removeTempImage);
  productsRouter.post("/:id", [checkRole(Roles.Admin), authenticateJWT], productController.uploadImage);
  productsRouter.delete("/img/:id", [checkRole(Roles.Admin), authenticateJWT], productController.removeImage);

  return productsRouter;
};
