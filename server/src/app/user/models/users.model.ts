import Objection, {Model} from "objection";

import {Comments} from "@/app/models/comments/comments";
import {FavoriteProducts} from "@/app/models/favorite-products/favorite-products";
import {Feedbacks} from "@/app/models/feedbacks/feedbacks";
import {RolesModel} from "@/app/user/models/roles.model";
import {Products} from "@/app/models/products/products";


class UsersModel extends Model {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  user_photo: string;
  role: number;
  is_get_update: boolean;
  created_at: Objection.FunctionBuilder;
  updated_at: Objection.FunctionBuilder;

  static get tableName() {
    return "users";
  }


  static get idColumn() {
    return "user_id";
  }


  static relationMappings = {
    users_roles: {
      relation: Model.HasOneRelation,
      modelClass: RolesModel,
      join: {
        from: "users.role",
        to: "roles.role_id"
      }
    },

    users_products_comments: {
      relation: Model.ManyToManyRelation,
      modelClass: Products,
      join: {
        from: "users.user_id",
        through: {
          from: "comments.user",
          extra: ["comment_id", "comment_msg", "created_at", "updated_at"],
          to: "comments.product"
        },
        to: "products.product_id"
      }
    },
    users_comments: {
      relation: Model.HasManyRelation,
      modelClass: Comments,
      join: {
        from: "users.user_id",
        to: "comments.user"
      }
    },

    users_products_feedbacks: {
      relation: Model.ManyToManyRelation,
      modelClass: Products,
      join: {
        from: "users.user_id",
        through: {
          from: "feedbacks.user",
          extra: ["feedback_type", "created_at", "updated_at"],
          to: "feedbacks.product"
        },
        to: "products.product_id"
      }
    },
    users_feedback: {
      relation: Model.HasManyRelation,
      modelClass: Feedbacks,
      join: {
        from: "users.user_id",
        to: "feedbacks.user"
      }
    },

    users_favorite_products: {
      relation: Model.ManyToManyRelation,
      modelClass: Products,
      join: {
        from: "users.user_id",
        through: {
          from: "favorite_products.user",
          extra: ["created_at", "updated_at"],
          to: "favorite_products.product"
        },
        to: "products.product_id"
      }
    },
    users_favorite: {
      relation: Model.HasManyRelation,
      modelClass: FavoriteProducts,
      join: {
        from: "users.user_id",
        to: "favorite_products.user"
      }
    },

    users_views_products: {
      relation: Model.ManyToManyRelation,
      modelClass: Products,
      join: {
        from: "users.user_id",
        through: {
          from: "views.user",
          extra: ["created_at", "updated_at"],
          to: "views.product"
        },
        to: "products.product_id"
      }
    },
    users_views: {
      relation: Model.HasManyRelation,
      modelClass: FavoriteProducts,
      join: {
        from: "users.user_id",
        to: "views.user"
      }
    }
  }

  $beforeInsert() {
    this.created_at = UsersModel.fn.now();
    this.updated_at = UsersModel.fn.now();
  }

  $beforeUpdate() {
    this.updated_at = UsersModel.fn.now();
  }
}

export {UsersModel};
