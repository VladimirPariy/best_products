import {Model} from "objection";
import {ProductsModel} from "@/app/product/models/products.model";

export class ProductCharacteristicModel extends Model {
  characteristic_description: string;
  characteristic_title: string;


  static get tableName() {
    return "product_characteristics";
  }

  static get idColumn() {
    return "product_characteristic_id";
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "product_characteristics.product",
          to: "products.product_id"
        }
      }
    }
  }
}

