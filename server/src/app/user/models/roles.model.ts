import {Model} from 'objection'


class RolesModel extends Model {

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }
}

export {RolesModel};