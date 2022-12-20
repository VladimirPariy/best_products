import {Model} from "objection";

import {Comments} from "@/app/models/comments/comments";
import {FavoriteProducts} from "@/app/models/favorite-products/favorite-products";
import {Feedbacks} from "@/app/models/feedbacks/feedbacks";
import {Characteristics, ProductCharacteristic} from "@/app/product/models/characteristics";
import {PriceHistoryModel} from "@/app/product/models/price-history.model";
import {ProductsImagesModel} from "@/app/product/models/products-images.model";
import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";
import {UsersModel} from "@/app/user/models/users.model";
import {Views} from "@/app/models/views/views";


class ProductsModel extends Model {
  static get tableName() {
    return "products";
  }


  static get idColumn() {
    return "product_id";
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: ['product_title', 'product_description', 'price'],

      properties: {
        product_id: {type: 'integer'},
        product_title: {type: 'string', minLength: 1, maxLength: 45},
        product_description: {type: 'string', minLength: 1, maxLength: 255},
        price: {type: 'integer'},
      }
    }
  };


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
      modelClass: ProductsImagesModel,
      join: {
        from: "products_images.product",
        to: "products.product_id"
      }
    },


    price_history: {
      relation: Model.HasManyRelation,
      modelClass: PriceHistoryModel,
      join: {
        from: "price_history.product",
        to: "products.product_id"
      }
    },


    subcategories: {
      relation: Model.ManyToManyRelation,
      modelClass: SubcategoryModel,
      join: {
        from: "products.product_id",
        through: {
          from: "product_subcategories.product",
          to: "product_subcategories.subcategory"
        },
        to: "subcategories.subcategory_id"
      }
    },


    users_comments: {
      relation: Model.ManyToManyRelation,
      modelClass: UsersModel,
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
      modelClass: UsersModel,
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
      modelClass: UsersModel,
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
      modelClass: UsersModel,
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

export {ProductsModel};


