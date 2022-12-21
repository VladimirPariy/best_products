import {Model} from "objection";
import {IPriceHistory, IProductCharacteristic, IProductImage, IProductSubcategory} from "@/app/product/product.interfaces";

import {ProductSubcategoryModal} from "@/app/categories/models/product-subcategories.model";
import {CommentsModel} from "@/app/models/comments/comments.model";
import {FavoriteProductsModel} from "@/app/models/favorite-products/favorite-products.model";
import {FeedbacksModel} from "@/app/models/feedbacks/feedbacks.model";
import {ProductCharacteristicModel} from "@/app/product/models/characteristics";
import {PriceHistoryModel} from "@/app/product/models/price-history.model";
import {ProductsImagesModel} from "@/app/product/models/products-images.model";
import {SubcategoryModel} from "@/app/categories/models/subcatigories.model";
import {UsersModel} from "@/app/user/models/users.model";
import {ViewsModel} from "@/app/models/views/views.model";


class ProductsModel extends Model {
  product_title: string;
  product_description: string;
  price: number;
  product_characteristics: IProductCharacteristic[];
  product_images: IProductImage[];
  price_history: IPriceHistory[];
  product_subcategory: IProductSubcategory[]


  static get tableName() {
    return "products";
  }


  static get idColumn() {
    return "product_id";
  }


  static relationMappings = {
    product_characteristics: {
      relation: Model.HasManyRelation,
      modelClass: ProductCharacteristicModel,
      join: {
        from: "product_characteristics.product",
        to: "products.product_id"
      }
    },

    product_images: {
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

    product_subcategory: {
      relation: Model.HasManyRelation,
      modelClass: ProductSubcategoryModal,
      join: {
        from: "product_subcategories.product",
        to: "products.product_id"
      }
    },


    //
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
      modelClass: CommentsModel,
      join: {
        from: "comments.product",
        to: "products.product_id"
      }
    },


    feedbacks: {
      relation: Model.HasManyRelation,
      modelClass: FeedbacksModel,
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
      modelClass: FavoriteProductsModel,
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
      modelClass: ViewsModel,
      join: {
        from: "products.product_id",
        to: "views.product"
      }
    }
  };
}

export {ProductsModel};


