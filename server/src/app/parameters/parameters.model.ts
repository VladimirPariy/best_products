import { Model, QueryBuilder } from "objection";
import { SubcategoryModel } from "../categories/models/subcatigories.model";
import { CharacteristicsModel } from "../characteristics/models/characteristics.model";

export class ParametersModel extends Model {
  parameter_id: number;
  subcategory: number;
  parameter_title: string;

  static get tableName() {
    return "parameters";
  }

  static get idColumn() {
    return "parameter_id";
  }

  static get modifiers() {
    return {
      selectShotParameter: (builder: QueryBuilder<any, any>) => {
        builder.select("parameter_id", "parameter_title");
      },
    };
  }

  static get relationMappings() {
    return {
      subcategory: {
        relation: Model.HasOneRelation,
        modelClass: SubcategoryModel,
        join: {
          from: "parameters.subcategory",
          to: "subcategories.subcategory_id",
        },
      },
      characteristics: {
        relation: Model.HasManyRelation,
        modelClass: CharacteristicsModel,
        join: {
          from: "characteristics.parameter",
          to: "parameters.parameter_id",
        },
      },
    };
  }
}
