import {Model} from 'objection'
import {UsersModel} from "@/app/user/models/users.model";


class RolesModel extends Model {

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }


  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: UsersModel,
      join: {
        from: 'roles.role_id',
        to: 'users.role'
      }
    }
  }
}

export {RolesModel};