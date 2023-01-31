import { Model, QueryBuilder } from "objection";
import { ParametersModel } from "../../parameters/parameters.model";
import { ProductCharacteristicModel } from "./product-characteristics.model";

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

  static get modifiers() {
    return {
      selectShotCharacteristic: (builder: QueryBuilder<any, any>) => {
        builder.select("characteristic_id", "characteristic_title");
      },
    };
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
