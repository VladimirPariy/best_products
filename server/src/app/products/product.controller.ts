import { Response, Request, NextFunction } from "express";

import { HttpException } from "@/app/common/errors/exceptions";
import ProductService from "@/app/products/product.service";

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.getAllProducts();
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async getProductDetailsById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await ProductService.getProductDetailsById(+id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await ProductService.removeOneProduct(id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async createNewProduct(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.createNewProduct(req.body);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async uploadTempImages(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.uploadTempImages(req.files);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeTempImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      return next(HttpException.badRequest(`Image id not specified`));
    }
    const data = await ProductService.removeTempImages(+id);
    res.status(200).send(data);
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await ProductService.updateOneProduct(id, req);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await ProductService.uploadImage(+id, req.files);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async removeImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = await ProductService.removeImage(+id);
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async getFilteredProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { page, limit, category, orderBy, filter } = req.query;
    if (!category)
      return next(HttpException.badRequest(`Category not specified`));
    const data = await ProductService.getFilteredAndSortedProductsByCategory(
      category as string,
      orderBy as "desc" | "asc",
      page ? +page : 0,
      limit ? +limit : 10,
      filter as string
    );
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }

  async searchProductsAndSubcategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { search } = req.query;
    if (!search || (search as string).length < 3) {
      return next(HttpException.badRequest("Refine search string"));
    }
    const data = await ProductService.searchByProductsAndSubcategories(
      search as string
    );
    res.status(200).send(data);
  }
}

export default new ProductController();
