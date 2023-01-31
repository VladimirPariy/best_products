import { Model, QueryBuilder } from "objection";

import { CategoriesModel } from "./categories.model";

export class SubcategoryModel extends Model {
  subcategory_id: number;
  category: number;
  subcategory_title: string;

  static tableName = "subcategories";

  static idColumn = "subcategory_id";

  static get modifiers() {
    return {
      selectShotSubcategory: (builder: QueryBuilder<any, any>) => {
        builder.select("subcategory_id", "subcategory_title");
      },
    };
  }

  static get relationMappings() {
    return {
      categories: {
        relation: Model.HasOneRelation,
        modelClass: CategoriesModel,
        join: {
          from: "subcategories.category",
          to: "categories.category_id",
        },
      },
    };
  }
}
