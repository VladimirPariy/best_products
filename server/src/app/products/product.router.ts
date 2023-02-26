import { Router } from "express";
import { upload } from "../common/middlewares/multer";
import { authenticateJWT } from "../common/middlewares/auth-middleware";
import { checkRole } from "../common/middlewares/role-middleware";
import { Roles } from "../common/enums/Roles";
import { tryCatch } from "../common/utils/try-catch";
import ProductController from "./product.controller";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();
  const instanceProductController = ProductController.getInstance();

  productsRouter.get("/", tryCatch(instanceProductController.getAllProducts));
  productsRouter.get("/filter", tryCatch(instanceProductController.getFilteredProductsByCategory));
  productsRouter.get("/search", tryCatch(instanceProductController.searchProductsAndSubcategory));
  productsRouter.get("/:id", tryCatch(instanceProductController.getProductDetailsById));
  productsRouter.post(
    "/temp",
    [checkRole(Roles.Admin), authenticateJWT, upload.single("img")],
    tryCatch(instanceProductController.uploadTempImages)
  );
  productsRouter.post(
    "/",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.createNewProduct)
  );
  productsRouter.post(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT, upload.single("img")],
    tryCatch(instanceProductController.uploadImage)
  );
  productsRouter.patch(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.updateProduct)
  );
  productsRouter.delete(
    "/img/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeImage)
  );
  productsRouter.delete(
    "/temp/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeTempImage)
  );
  productsRouter.delete(
    "/:id",
    [checkRole(Roles.Admin), authenticateJWT],
    tryCatch(instanceProductController.removeProduct)
  );

  return productsRouter;
};
