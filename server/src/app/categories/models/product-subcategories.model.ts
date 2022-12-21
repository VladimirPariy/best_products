import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";
import {ProductsModel} from "@/app/product/models/products.model";
import {Model} from "objection";

export class ProductSubcategoryModal extends Model {
  static get tableName() {
    return "product_subcategories";
  }

  static get idColumn() {
    return ["product", "subcategory"];
  }


  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "product_subcategories.product",
        to: "products.product_id"
      }
    },
    subcategories: {
      relation: Model.HasOneRelation,
      modelClass: SubcategoryModel,
      join: {
        from: "product_subcategories.subcategory",
        to: "subcategories.subcategory_id"
      }
    }
  }
}