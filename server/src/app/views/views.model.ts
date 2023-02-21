import Objection, { Model } from "objection";

export class ViewsModel extends Model {
  view_id: number;
  product: number;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "views";
  }

  static get idColumn() {
    return "view_id";
  }

  $beforeInsert() {
    this.created_at = ViewsModel.fn.now();
    this.updated_at = ViewsModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = ViewsModel.fn.now();
  }
}
