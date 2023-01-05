import { Model } from "objection";
import { ParametersModel } from "@/app/products/models/parameters.model";
import { ProductCharacteristicModel } from "@/app/products/models/product-characteristics.model";

export class CharacteristicsModel extends Model {
  characteristic_id: number;
  characteristic_title: string;
  parameter: number;

  static get tableName() {
    return "characteristics";
  }

  static get idColumn() {
    return "characteristic_id";
  }

  static get relationMappings() {
    return {
      parameters: {
        relation: Model.HasOneRelation,
        modelClass: ParametersModel,
        join: {
          from: "characteristics.parameter",
          to: "parameters.parameter_id",
        },
      },
      product_characteristics: {
        relation: Model.HasManyRelation,
        modelClass: ProductCharacteristicModel,
        join: {
          from: "characteristics.characteristic_id",
          to: "product_characteristics.characteristic",
        },
      },
    };
  }
}
