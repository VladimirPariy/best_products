import { Model } from "objection";

export class ProductCharacteristicModel extends Model {
  product_characteristic_id: number;
  characteristic: number;
  product: number;

  static get tableName() {
    return "product_characteristics";
  }

  static get idColumn() {
    return "product_characteristic_id";
  }
}
