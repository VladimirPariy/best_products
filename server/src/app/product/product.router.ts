import productController from "@/app/product/product.controller";
import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();

  productsRouter.post(EndpointsList.CREATE_PRODUCT, productController.createNewProduct);

  return productsRouter;
};