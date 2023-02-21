import { Model } from "objection";

export class RolesModel extends Model {
  role_id: number;
  role_title: string;

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }
}
