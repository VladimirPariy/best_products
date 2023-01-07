import { Model } from "objection";
import { ProductsModel } from "@/app/products/models/products.model";

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

  static get relationMappings() {
    return {
      product: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "product_characteristics.product",
          to: "products.product_id",
        },
      },
    };
  }
}
