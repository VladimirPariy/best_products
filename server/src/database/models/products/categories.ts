import {Product} from "@/database/models/products/product";
import {Model} from "objection";
import { Subcategory } from "@/database/models/products/subcatigories";

class Category extends Model{

  static get tableName() {
    return "categories";
  };

  static get idColumn() {
    return "category_id";
  };

  static get relationMappings() {
    return {
      subcategories: {
        relation: Model.HasManyRelation,
        modelClass: Subcategory,
        join: {
          from: "subcategories.category",
          to: "categories.category_id"
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.category_id",
          to: "products.category"
        }
      },
    }
  };
}
export {Category}


