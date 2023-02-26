import { CategoriesModel } from "./models/categories.model";
import { ProductSubcategoryModal } from "./models/product-subcategories.model";

export default class CategoriesService {
  async allCategories() {
    return CategoriesModel.query().withGraphJoined("subcategories");
  }

  async getCategoryByTitle(category_title: string) {
    return CategoriesModel.query().where({ category_title });
  }

  async updateSubcategory(subcategory: number, id: number) {
    return ProductSubcategoryModal.query().update({ subcategory }).where("product", id);
  }

  //singleton
  private static instance: CategoriesService;
  private constructor() {}
  public static getInstance(): CategoriesService {
    if (!CategoriesService.instance) {
      CategoriesService.instance = new CategoriesService();
    }
    return CategoriesService.instance;
  }
}
