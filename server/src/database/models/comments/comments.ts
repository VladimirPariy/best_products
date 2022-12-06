import {Product} from "@/database/models/products/product";
import {Users} from "@/database/models/users/users";
import {Model} from "objection";

class Comments extends Model {
  static get tableName() {
    return "comments";
  };

  static get idColumn() {
    return "comments_id";
  }

  static relationMappings = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: Users,
      join: {
        from: "comments.user",
        to: "users.user_id"
      }
    },
    products: {
      relation: Model.HasOneRelation,
      modelClass: Product,
      join: {
        from: "comments.product",
        to: "products.product_id"
      }
    },

  }
}

export {Comments}