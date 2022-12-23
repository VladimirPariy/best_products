import {ViewsModel} from "@/app/models/views/views.model";
import Objection, {Model} from "objection";

import {CommentsModel} from "@/app/models/comments/comments.model";
import {FavoriteProductsModel} from "@/app/models/favorite-products/favorite-products.model";
import {FeedbacksModel} from "@/app/models/feedbacks/feedbacks.model";
import {RolesModel} from "@/app/user/models/roles.model";
import {ProductsModel} from "@/app/product/models/products.model";


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


  static get relationMappings() {
    return {
      users_roles: {
        relation: Model.HasOneRelation,
        modelClass: RolesModel,
        join: {
          from: "users.role",
          to: "roles.role_id"
        }
      },

      users_views: {
        relation: Model.HasManyRelation,
        modelClass: ViewsModel,
        join: {
          from: "users.user_id",
          to: "views.user"
        }
      },
      users_comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "comments.user",
          to: "users.user_id"
        }
      },
      users_feedback: {
        relation: Model.HasManyRelation,
        modelClass: FeedbacksModel,
        join: {
          from: "feedbacks.user",
          to: "users.user_id"
        }
      },
      users_favorite: {
        relation: Model.HasManyRelation,
        modelClass: FavoriteProductsModel,
        join: {
          from: "favorite_products.user",
          to: "users.user_id"
        }
      },


      users_products_comments: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductsModel,
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

      users_products_feedbacks: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductsModel,
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


      users_favorite_products: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductsModel,
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


      users_views_products: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductsModel,
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
