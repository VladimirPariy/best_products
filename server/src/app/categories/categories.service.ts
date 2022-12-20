import {CategoriesModel} from "@/app/categories/models/categories.model";


class CategoriesService {

  async allCategories() {
    return CategoriesModel.query().withGraphJoined('subcategories');
  }
}

export default new CategoriesService();
