import { CategoriesModel } from "./models/categories.model";

export default class CategoriesService {
  private static instance: CategoriesService;
  private constructor() {}

  public static getInstance(): CategoriesService {
    if (!CategoriesService.instance) {
      CategoriesService.instance = new CategoriesService();
    }
    return CategoriesService.instance;
  }

  async allCategories() {
    return CategoriesModel.query().withGraphJoined("subcategories");
  }
}
