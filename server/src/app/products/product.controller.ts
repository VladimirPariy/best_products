import { Response, Request } from "express";
import { HttpException } from "../common/errors/exceptions";
import ProductService from "./product.service";

const instanceProductService = ProductService.getInstance();

export default class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const data = await instanceProductService.getAllProducts();
    res.status(200).send(data);
  }

  async getProductDetailsById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await instanceProductService.getProductDetailsById(id);
    res.status(200).send(data);
  }

  async removeProduct(req: Request, res: Response) {
    const { id } = req.params;
    const data = await instanceProductService.removeOneProduct(id);
    res.status(200).send(data);
  }

  async createNewProduct(req: Request, res: Response) {
    const data = await instanceProductService.createNewProduct(req.body);
    res.status(200).send(data);
  }

  async uploadTempImages(req: Request, res: Response) {
    const data = await instanceProductService.uploadTempImages(req.files);
    res.status(200).send(data);
  }

  async removeTempImage(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      throw HttpException.badRequest(`Image id not specified`);
    }
    const data = await instanceProductService.removeTempImages(+id);
    res.status(200).send(data);
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const data = await instanceProductService.updateOneProduct(id, req);
    res.status(200).send(data);
  }

  async uploadImage(req: Request, res: Response) {
    const { id } = req.params;
    const data = await instanceProductService.uploadImage(+id, req.files);
    res.status(200).send(data);
  }

  async removeImage(req: Request, res: Response) {
    const { id } = req.params;
    const data = await instanceProductService.removeImage(+id);
    res.status(200).send(data);
  }

  async getFilteredProductsByCategory(req: Request, res: Response) {
    const { page, limit, category, orderBy, filter } = req.query;
    if (!category) {
      throw HttpException.badRequest(`Category not specified`);
    }
    const data = await instanceProductService.getFilteredAndSortedProductsByCategory(
      category as string,
      orderBy as "desc" | "asc",
      page ? +page : 0,
      limit ? +limit : 10,
      filter as string
    );
    res.status(200).send(data);
  }

  async searchProductsAndSubcategory(req: Request, res: Response) {
    const { search } = req.query;
    if (!search || (search as string).length < 3) {
      throw HttpException.badRequest("Refine search string");
    }
    const data = await instanceProductService.searchByProductsAndSubcategories(search as string);
    res.status(200).send(data);
  }

  //singleton
  private static instance: ProductController;
  private constructor() {}
  public static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }
}
