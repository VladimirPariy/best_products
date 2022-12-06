import {Category} from "@/database/models/products/categories";
import {Product} from "@/database/models/products/product";
import {Model} from "objection";

class Subcategory extends Model {

  static get tableName() {
    return "subcategories";
  };

  static get idColumn() {
    return "subcategory_id";
  };

  static get relationMappings() {
    return {
      categories: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: "subcategories.category",
          to: "categories.category_id"
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "subcategory.subcategory_id",
          through: {
            from: "prod_subcategories.subcategory",
            to: "prod_subcategories.product"
          },
          to: "product.product_id"
        }
      }
    }
  };
}

class ProdSubcategory extends Model {
  static get tableName() {
    return "prod_subcategories";
  };

  static get idColumn() {
    return ["product", "subcategory"];
  };

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: "prod_subcategories.product",
          to: "product.product_id"
        }
      },
      subcategories:{
        relation:Model.HasOneRelation,
        modelClass:Subcategory,
        join:{
          from:"prod_subcategories.subcategory",
          to:"subcategories.subcategory_id"
        }
      }
    }
  }
}

export {Subcategory, ProdSubcategory}