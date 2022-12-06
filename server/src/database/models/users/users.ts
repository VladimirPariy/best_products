import {Product} from "@/database/models/products/product";
import {Subcategory} from "@/database/models/products/subcatigories";
import {Knex} from "knex";
import {Model} from "objection";
import {Roles} from "@/database/models/users/role";

class Users extends Model {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  user_photo: string;
  role: number;
  created_at: Knex.Raw;
  updated_at: Knex.Raw;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "user_id";
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.HasOneRelation,
        modelClass: Roles,
        join: {
          from: "users.role",
          to: "roles.role_id"
        }
      },
      products_comments:{
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "users.user_id",
          through: {
            from: "comments.user",
            extra:["comments_id", "comments_msg"],
            to: "comments.product"
          },
          to: "products.product_id"
        }
      }
    }
  }

  $beforeInsert() {
    this.created_at = Model.knex().fn.now();
    this.updated_at = Model.knex().fn.now();
  }

  $beforeUpdate() {
    this.updated_at = Model.knex().fn.now();
  }

}

export {Users};
