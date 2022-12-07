import {Model} from "objection";
import {Products} from "@/database/models/products/products";

class ProductCharacteristic extends Model {

  static get tableName() {
    return "product_characteristics";
  };

  static get idColumn() {
    return "product_characteristic_id";
  };

  static get relationMappings() {
    return {
      characteristics: {
        relation: Model.HasOneRelation,
        modelClass: Characteristics,
        join: {
          from: "product_characteristics.characteristic",
          to: "characteristics.characteristic_id"
        }
      },
      products: {
        relation: Model.HasOneRelation,
        modelClass: Products,
        join: {
          from: "product_characteristics.product",
          to: "products.product_id"
        }
      }
    }
  };
}


class Characteristics extends Model {

  static get tableName() {
    return "characteristics";
  };

  static get idColumn() {
    return "characteristic_id";
  };

  static relationMappings = {
    prod_characteristic: {
      relation: Model.HasManyRelation,
      modelClass: ProductCharacteristic,
      join: {
        from: "characteristics.characteristic_id",
        to: "product_characteristics.characteristic"
      }
    }
  };
}

export {Characteristics, ProductCharacteristic};