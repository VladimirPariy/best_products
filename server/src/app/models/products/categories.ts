import {Model} from "objection";

import {Products} from "@/app/models/products/products";
import {Subcategory} from "@/app/models/products/subcatigories";


class Categories extends Model {

  static get tableName() {
    return "categories";
  };

  static get idColumn() {
    return "category_id";
  };

  static relationMappings = {
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
      modelClass: Products,
      join: {
        from: "categories.category_id",
        to: "products.category"
      }
    }
  }
}

export {Categories}


