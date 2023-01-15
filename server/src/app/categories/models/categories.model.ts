import { Model } from "objection";

import { SubcategoryModel } from "@/app/categories/models/subcatigories.model";

export class CategoriesModel extends Model {
  category_id: number;
  category_title: string;

  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "category_id";
  }

  static get relationMappings() {
    return {
      subcategories: {
        relation: Model.HasManyRelation,
        modelClass: SubcategoryModel,
        join: {
          from: "subcategories.category",
          to: "categories.category_id",
        },
      },
    };
  }
}
