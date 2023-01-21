import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import FavoriteProductsService from "@/app/favorite-products/favorite-products.service";

class FavoriteProductsController {
  async getFavoriteProductsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (isNaN(+id) || !id) {
      return next(HttpException.badRequest("Missing user id"));
    }
    const data = await FavoriteProductsService.getFavoriteProductsByUserId(+id);
    res.status(200).send(data);
  }

  async addProductIntoFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return next(HttpException.badRequest("Missing user id or product id"));
    }
    if (isNaN(+productId) || isNaN(+userId)) {
      return next(HttpException.badRequest("Product id or user id is invalid"));
    }
    const data = await FavoriteProductsService.addProductIntoFavorite(
      +userId,
      +productId
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeProductFromFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      return next(HttpException.badRequest("Missing user id or product id"));
    }
    if (isNaN(+productId) || isNaN(+userId)) {
      return next(HttpException.badRequest("Product id or user id is invalid"));
    }
    const data = await FavoriteProductsService.removeProductFromFavorite(
      +userId,
      +productId
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new FavoriteProductsController();
