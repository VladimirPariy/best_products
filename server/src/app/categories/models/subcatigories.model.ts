import {Model} from "objection";

import {CategoriesModel} from "@/app/categories/models/categories.model";
import {ProductsModel} from "@/app/product/models/products.model";


class SubcategoryModel extends Model {

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

class ProductSubcategoryModal extends Model {
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

export {SubcategoryModel, ProductSubcategoryModal}