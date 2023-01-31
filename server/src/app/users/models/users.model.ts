import Objection, { Model, QueryBuilder } from "objection";

import { CommentsModel } from "../../comments/comments.model";
import { FavoriteProductsModel } from "../../favorite-products/favorite-products.model";
import { FeedbacksModel } from "../../feedbacks/models/feedbacks.model";
import { RolesModel } from "./roles.model";

class UsersModel extends Model {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  user_photo: string;
  is_get_update: boolean;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;
  role: number;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "user_id";
  }

  static get modifiers() {
    return {
      selectShotUserInfo: (query: QueryBuilder<any, any>) => {
        query.select(
          "created_at",
          "email",
          "first_name",
          "last_name",
          "updated_at",
          "user_id",
          "user_photo"
        );
      },
    };
  }

  static get relationMappings() {
    return {
      users_roles: {
        relation: Model.HasOneRelation,
        modelClass: RolesModel,
        join: {
          from: "users.role",
          to: "roles.role_id",
        },
      },

      users_comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "comments.user",
          to: "users.user_id",
        },
      },
      users_feedback: {
        relation: Model.HasManyRelation,
        modelClass: FeedbacksModel,
        join: {
          from: "feedbacks.user",
          to: "users.user_id",
        },
      },
      users_favorite: {
        relation: Model.HasManyRelation,
        modelClass: FavoriteProductsModel,
        join: {
          from: "favorite_products.user",
          to: "users.user_id",
        },
      },
    };
  }

  $beforeInsert() {
    this.created_at = UsersModel.fn.now();
    this.updated_at = UsersModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = UsersModel.fn.now();
  }
}

export { UsersModel };
