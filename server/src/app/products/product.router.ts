import { Router } from "express";

import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import ProductController from "./product.controller";
import { Roles } from "../common/enums/Roles";
import { tryCatch } from "../common/utils/try-catch";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();
  const instanceProductController = ProductController.getInstance();

  productsRouter.get("/", tryCatch(instanceProductController.getAllProducts));
  productsRouter.get("/filter", tryCatch(instanceProductController.getFilteredProductsByCategory));
  productsRouter.get("/search", tryCatch(instanceProductController.searchProductsAndSubcategory));
  productsRouter.get("/:id", tryCatch(instanceProductController.getProductDetailsById));
  productsRouter.delete(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeProduct)
  );
  productsRouter.patch(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.updateProduct)
  );
  productsRouter.post(
    "/",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.createNewProduct)
  );
  productsRouter.post(
    "/temp",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.uploadTempImages)
  );
  productsRouter.delete(
    "/temp/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeTempImage)
  );
  productsRouter.post(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.uploadImage)
  );
  productsRouter.delete(
    "/img/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeImage)
  );

  return productsRouter;
};
