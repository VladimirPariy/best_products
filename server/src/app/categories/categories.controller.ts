import { Response, Request } from "express";

import CategoriesService from "./categories.service";

class CategoriesController {
  async getAll(req: Request, res: Response) {
    const data = await CategoriesService.allCategories();
    res.status(200).send(data);
  }
}

export default new CategoriesController();
