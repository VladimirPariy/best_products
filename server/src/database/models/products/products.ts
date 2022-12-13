import {Model} from "objection";

import {Comments} from "@/database/models/comments/comments";
import {FavoriteProducts} from "@/database/models/favorite-products/favorite-products";
import {Feedbacks} from "@/database/models/feedbacks/feedbacks";
import {Characteristics, ProductCharacteristic} from "@/database/models/products/characteristics";
import {PriceHistory} from "@/database/models/products/price-history";
import {ProductsImages} from "@/database/models/products/products-images";
import {Subcategory} from "@/database/models/products/subcatigories";
import {Users} from "@/database/models/users/users";
import {Views} from "@/database/models/views/views";


class Products extends Model {
  static get tableName() {
    return "products";
  }


  static get idColumn() {
    return "product_id";
  }


  static relationMappings = {
    prod_characteristic: {
      relation: Model.HasManyRelation,
      modelClass: ProductCharacteristic,
      join: {
        from: "product_characteristics.product",
        to: "products.product_id"
      }
    },
    characteristics: {
      relation: Model.ManyToManyRelation,
      modelClass: Characteristics,
      join: {
        from: "products.product_id",
        through: {
          from: "product_characteristics.product",
          extra: ["characteristic_description"],
          to: "product_characteristics.characteristic"
        },
        to: "characteristics.characteristic_id"
      }
    },


    products_images: {
      relation: Model.HasManyRelation,
      modelClass: ProductsImages,
      join: {
        from: "products_images.product",
        to: "products.product_id"
      }
    },


    price_history: {
      relation: Model.HasManyRelation,
      modelClass: PriceHistory,
      join: {
        from: "price_history.product",
        to: "products.product_id"
      }
    },


    subcategories: {
      relation: Model.ManyToManyRelation,
      modelClass: Subcategory,
      join: {
        from: "products.product_id",
        through: {
          from: "prod_subcategories.product",
          to: "prod_subcategories.subcategory"
        },
        to: "subcategories.subcategory_id"
      }
    },


    users_comments: {
      relation: Model.ManyToManyRelation,
      modelClass: Users,
      join: {
        from: "products.product_id",
        through: {
          from: "comments.product",
          extra: ["comment_id", "comment_msg"],
          to: "comments.user"
        },
        to: "users.user_id"
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comments,
      join: {
        from: "comments.product",
        to: "products.product_id"
      }
    },


    feedbacks: {
      relation: Model.HasManyRelation,
      modelClass: Feedbacks,
      join: {
        from: "products.product_id",
        to: "feedbacks.product"
      }
    },
    users_feedbacks: {
      relation: Model.ManyToManyRelation,
      modelClass: Users,
      join: {
        from: "products.product_id",
        through: {
          from: "feedbacks.product",
          extra: ["feedback_type", "created_at", "updated_at"],
          to: "feedbacks.user"
        },
        to: "users.user_id"
      }
    },


    favorite_products: {
      relation: Model.HasManyRelation,
      modelClass: FavoriteProducts,
      join: {
        from: "products.product_id",
        to: "favorite_products.product"
      }
    },
    users_favorite_products: {
      relation: Model.ManyToManyRelation,
      modelClass: Users,
      join: {
        from: "products.product_id",
        through: {
          from: "favorite_products.product",
          extra: ["created_at", "updated_at"],
          to: "favorite_products.user"
        },
        to: "users.user_id"
      }
    },

    users_views: {
      relation: Model.ManyToManyRelation,
      modelClass: Users,
      join: {
        from: "products.product_id",
        through: {
          from: "views.product",
          extra: ["created_at", "updated_at"],
          to: "views.user"
        },
        to: "users.user_id"
      }
    },
    views: {
      relation: Model.HasManyRelation,
      modelClass: Views,
      join: {
        from: "products.product_id",
        to: "views.product"
      }
    }
  };
}

export {Products};


