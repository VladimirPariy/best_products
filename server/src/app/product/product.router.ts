import {authenticateJWT} from "@/app/common/middlewares/auth-middleware";
import {checkRole} from "@/app/common/middlewares/role-middleware";
import productController from "@/app/product/product.controller";
import {Router} from "express";

import {EndpointsList} from "@/app/common/enums/endpoints-list";

export const createProductsRouter = (): Router => {
  const productsRouter = Router();

	productsRouter.get(EndpointsList.GET_ALL_PRODUCTS, productController.getAllProducts)
	productsRouter.get(EndpointsList.ONE_PRODUCT_BY_ID, productController.getOneProduct)
	productsRouter.delete(EndpointsList.ONE_PRODUCT_BY_ID, [checkRole('1'), authenticateJWT], productController.removeProduct)
	productsRouter.patch(EndpointsList.ONE_PRODUCT_BY_ID, [checkRole('1'), authenticateJWT], productController.updateProduct)
  productsRouter.post(EndpointsList.CREATE_PRODUCT, [checkRole('1'), authenticateJWT], productController.createNewProduct);
	
  return productsRouter;
};