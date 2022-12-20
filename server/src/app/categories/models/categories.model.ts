import {Model} from "objection";

import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";


export class CategoriesModel extends Model {

  static get tableName() {
    return "categories";
  };

  static get idColumn() {
    return "category_id";
  };

  static relationMappings = {
    subcategories: {
      relation: Model.HasManyRelation,
      modelClass: SubcategoryModel,
      join: {
        from: "subcategories.category",
        to: "categories.category_id"
      }
    }
  }
}



