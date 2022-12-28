import { Model } from "objection";

class RolesModel extends Model {
  role_id: number;
  role_title: string;

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }
}

export { RolesModel };
