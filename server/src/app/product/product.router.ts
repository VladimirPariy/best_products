import {authenticateJWT} from "@/app/common/middlewares/auth-middleware";
import {checkRole} from "@/app/common/middlewares/role-middleware";
import productController from "@/app/product/product.controller";
import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();

  productsRouter.post(EndpointsList.CREATE_PRODUCT, [checkRole('1'), authenticateJWT], productController.createNewProduct);

  return productsRouter;
};