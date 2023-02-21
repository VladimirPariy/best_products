import { Response, Request } from "express";
import FavoriteProductsService from "./favorite-products.service";
import ProductService from "../products/product.service";
import { paramsSchema } from "../common/validations/params-validation";
import { userManipulationSchema } from "../common/validations/user-manipulation-validation";
import { HttpException } from "../common/errors/exceptions";

const instanceFavoriteProductsService = FavoriteProductsService.getInstance();
const instanceProductService = ProductService.getInstance();

export default class FavoriteProductsController {
  async getFavoriteProductsByUserId(req: Request, res: Response) {
    const payload = await paramsSchema.validate(req.params);

    const favoriteProductsIDs = await instanceFavoriteProductsService
      .getFavoriteProductsByUserId(payload.id)
      .then((data) => data.map((item) => item.product));
    const products = await instanceProductService.getProductOrProducts(favoriteProductsIDs);

    res.status(200).send(products);
  }

  async addProductIntoFavorite(req: Request, res: Response) {
    const payload = await userManipulationSchema.validate(req.body);

    const isExistInFavoriteList = await instanceFavoriteProductsService.getProductFromFavoriteList(
      payload
    );
    if (isExistInFavoriteList.length > 0) {
      throw HttpException.alreadyExists("The product is already in the favorite list");
    }
    const addedProduct = await instanceFavoriteProductsService.addProductIntoFavorite(payload);
    const products = await instanceProductService.getProductOrProducts(addedProduct.product);

    res.status(200).send(products);
  }

  async removeProductFromFavorite(req: Request, res: Response) {
    const payload = await userManipulationSchema.validate(req.body);

    const isExistInFavoriteList = await instanceFavoriteProductsService.getProductFromFavoriteList(
      payload
    );
    if (isExistInFavoriteList.length === 0) {
      throw HttpException.alreadyExists("The product is already removed from the favorite list");
    }
    const removedAmount = await instanceFavoriteProductsService.removeProductFromFavorite(payload);

    res.status(200).send({
      userId: payload.userId,
      productId: payload.productId,
      status: "Successful removed",
      amount: removedAmount,
    });
  }

  //singleton
  private static instance: FavoriteProductsController;
  private constructor() {}
  public static getInstance(): FavoriteProductsController {
    if (!FavoriteProductsController.instance) {
      FavoriteProductsController.instance = new FavoriteProductsController();
    }
    return FavoriteProductsController.instance;
  }
}
