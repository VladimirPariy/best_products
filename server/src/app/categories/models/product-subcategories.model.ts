import { Model } from "objection";
import { SubcategoryModel } from "./subcatigories.model";
import { ProductsModel } from "../../products/models/products.model";

export class ProductSubcategoryModal extends Model {
  product: number;
  subcategory: number;

  static get tableName() {
    return "product_subcategories";
  }

  static get idColumn() {
    return ["product", "subcategory"];
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "product_subcategories.product",
          to: "products.product_id",
        },
      },
      subcategories: {
        relation: Model.HasOneRelation,
        modelClass: SubcategoryModel,
        join: {
          from: "product_subcategories.subcategory",
          to: "subcategories.subcategory_id",
        },
      },
    };
  }
}
