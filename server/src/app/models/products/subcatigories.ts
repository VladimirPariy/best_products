import {Model} from "objection";

import {Categories} from "@/app/models/products/categories";
import {Products} from "@/app/models/products/products";


class Subcategory extends Model {

  static tableName = "subcategories";

  static idColumn = "subcategory_id";

  static relationMappings = {
    categories: {
      relation: Model.HasOneRelation,
      modelClass: Categories,
      join: {
        from: "subcategories.category",
        to: "categories.category_id"
      }
    },
    products: {
      relation: Model.ManyToManyRelation,
      modelClass: Products,
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

class ProductSubcategory extends Model {
  static get tableName() {
    return "prod_subcategories";
  }

  static get idColumn() {
    return ["product", "subcategory"];
  }


  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: Products,
      join: {
        from: "product_subcategories.product",
        to: "products.product_id"
      }
    },
    subcategories: {
      relation: Model.HasOneRelation,
      modelClass: Subcategory,
      join: {
        from: "product_subcategories.subcategory",
        to: "subcategories.subcategory_id"
      }
    }
  }
}

export {Subcategory, ProductSubcategory}