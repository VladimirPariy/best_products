import { Router } from "express";

import { authenticateJWT } from "@/app/common/middlewares/auth-middleware";
import { checkRole } from "@/app/common/middlewares/role-middleware";
import productController from "@/app/products/product.controller";

import { EndpointsList } from "@/app/common/enums/endpoints-list";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();

  productsRouter.get(EndpointsList.PRODUCTS, productController.getAllProducts);
  productsRouter.get(
    EndpointsList.FILTERED_PRODUCTS,
    productController.getFilteredProductsByCategory
  );
  productsRouter.get(
    EndpointsList.ONE_PRODUCT_BY_ID,
    productController.getProductDetailsById
  );
  productsRouter.delete(
    EndpointsList.ONE_PRODUCT_BY_ID,
    [checkRole("1"), authenticateJWT],
    productController.removeProduct
  );
  productsRouter.patch(
    EndpointsList.ONE_PRODUCT_BY_ID,
    [checkRole("1"), authenticateJWT],
    productController.updateProduct
  );
  productsRouter.post(
    EndpointsList.PRODUCTS,
    [checkRole("1"), authenticateJWT],
    productController.createNewProduct
  );
  productsRouter.post(
    EndpointsList.TEMP_IMAGES,
    [checkRole("1"), authenticateJWT],
    productController.uploadTempImages
  );
  productsRouter.delete(
    EndpointsList.REMOVE_TEMP_IMAGES,
    [checkRole("1"), authenticateJWT],
    productController.removeTempImage
  );
  productsRouter.post(
    EndpointsList.ONE_PRODUCT_BY_ID,
    [checkRole("1"), authenticateJWT],
    productController.uploadImage
  );
  productsRouter.delete(
    EndpointsList.REMOVE_IMAGE,
    [checkRole("1"), authenticateJWT],
    productController.removeImage
  );

  return productsRouter;
};
