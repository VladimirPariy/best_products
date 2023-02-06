import { Response, Request, NextFunction } from "express";

import { HttpException } from "../common/errors/exceptions";
import ProductService from "./product.service";

const instanceProductService = ProductService.getInstance();

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const data = await instanceProductService.getAllProducts();
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async getProductDetailsById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await instanceProductService.getProductDetailsById(id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await instanceProductService.removeOneProduct(id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async createNewProduct(req: Request, res: Response, next: NextFunction) {
    const data = await instanceProductService.createNewProduct(req.body);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async uploadTempImages(req: Request, res: Response, next: NextFunction) {
    const data = await instanceProductService.uploadTempImages(req.files);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeTempImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      return next(HttpException.badRequest(`Image id not specified`));
    }
    const data = await instanceProductService.removeTempImages(+id);
    res.status(200).send(data);
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await instanceProductService.updateOneProduct(id, req);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await instanceProductService.uploadImage(+id, req.files);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await instanceProductService.removeImage(+id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async getFilteredProductsByCategory(req: Request, res: Response, next: NextFunction) {
    const { page, limit, category, orderBy, filter } = req.query;
    if (!category) return next(HttpException.badRequest(`Category not specified`));
    const data = await instanceProductService.getFilteredAndSortedProductsByCategory(
      category as string,
      orderBy as "desc" | "asc",
      page ? +page : 0,
      limit ? +limit : 10,
      filter as string
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async searchProductsAndSubcategory(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;
    if (!search || (search as string).length < 3) {
      return next(HttpException.badRequest("Refine search string"));
    }
    const data = await instanceProductService.searchByProductsAndSubcategories(search as string);
    res.status(200).send(data);
  }
}

export default new ProductController();
