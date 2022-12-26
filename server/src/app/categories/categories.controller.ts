import CategoriesService from "@/app/categories/categories.service";
import {Response, Request} from "express";

class CategoriesController {
  async getAll(req: Request, res: Response) {
    const data = await CategoriesService.allCategories();
    res.status(200).send(data);
  }
}

export default new CategoriesController();
