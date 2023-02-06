import { Response, Request } from "express";

import CategoriesService from "./categories.service";

export default class CategoriesController {
  private static instance: CategoriesController;
  private constructor() {}

  public static getInstance(): CategoriesController {
    if (!CategoriesController.instance) {
      CategoriesController.instance = new CategoriesController();
    }
    return CategoriesController.instance;
  }

  async getAll(req: Request, res: Response) {
    const data = await CategoriesService.getInstance().allCategories();
    res.status(200).send(data);
  }
}
