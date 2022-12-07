import {Model} from 'objection'

import {Users} from "@/database/models/users/users";


class Roles extends Model {

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }


  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: Users,
      join: {
        from: 'roles.role_id',
        to: 'users.role'
      }
    }
  }
}

export {Roles};