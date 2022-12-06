import {Product} from "@/database/models/products/product";
import {Model} from "objection";

class ProdCharacteristic extends Model {

  static get tableName() {
    return "prod_characteristic";
  };

  static get idColumn() {
    return "prod_characteristic_id";
  };

  static get relationMappings() {
    return {
      characteristics: {
        relation: Model.HasOneRelation,
        modelClass: Characteristics,
        join: {
          from: "prod_characteristic.characteristic",
          to: "characteristics.characteristic_id"
        }
      },
      products: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: "prod_characteristic.product",
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
      modelClass: ProdCharacteristic,
      join: {
        from: "characteristics.characteristic_id",
        to: "prod_characteristic.characteristic"
      }
    }
  };
}

export {Characteristics, ProdCharacteristic};