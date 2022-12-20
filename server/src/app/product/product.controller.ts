import {HttpException} from "@/app/common/errors/exceptions";
import ProductService from "@/app/product/product.service";
import {Response, Request, NextFunction} from "express";

class ProductController {
  async createNewProduct(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.createNewProduct(req.body, req.files)
    data instanceof HttpException ? next(data) : res.status(200).send(data);
  }
}

export default new ProductController();
