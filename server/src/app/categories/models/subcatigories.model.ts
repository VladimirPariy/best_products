import {Model} from "objection";

import {ProductsModel} from "@/app/product/models/products.model";


export class SubcategoryModel extends Model {

  static tableName = "subcategories";

  static idColumn = "subcategory_id";

  static relationMappings = {
    products: {
      relation: Model.ManyToManyRelation,
      modelClass: ProductsModel,
      join: {
        from: "subcategories.subcategory_id",
        through: {
          from: "product_subcategories.subcategory",
          to: "product_subcategories.product"
        },
        to: "products.product_id"
      }
    }
  }
}




