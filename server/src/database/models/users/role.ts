import {Model} from 'objection'
import {Users} from "./users";

class Roles extends Model {
  role_id: number;
  role_title: string;

  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }

  static get relationMappings() {
    return {
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
}

export {Roles}