import { Model } from "objection";
import { ProductsModel } from "@/app/products/models/products.model";

export class ProductCharacteristicModel extends Model {
  product_characteristic_id: number;
  characteristic_description: string;
  characteristic_title: string;
  product: number;

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
          to: "products.product_id",
        },
      },
    };
  }
}
