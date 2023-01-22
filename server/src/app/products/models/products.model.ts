import { Model } from "objection";

import { ProductSubcategoryModal } from "@/app/categories/models/product-subcategories.model";
import { CommentsModel } from "@/app/comments/comments.model";
import { FavoriteProductsModel } from "@/app/favorite-products/favorite-products.model";
import { FeedbacksModel } from "@/app/feedbacks/models/feedbacks.model";
import { ProductCharacteristicModel } from "@/app/characteristics/models/product-characteristics.model";
import { PriceHistoryModel } from "@/app/price-history/price-history.model";
import { ProductsImagesModel } from "@/app/products/models/products-images.model";
import { ViewsModel } from "@/app/views/views.model";
import { SubcategoryModel } from "@/app/categories/models/subcatigories.model";
import { CharacteristicsModel } from "@/app/characteristics/models/characteristics.model";
import { UsersModel } from "@/app/users/models/users.model";

class ProductsModel extends Model {
  product_id: number;
  product_title!: string;
  product_description!: string;
  price!: number;
  product_characteristics!: ProductCharacteristicModel[];
  product_images!: ProductsImagesModel[];
  price_history!: PriceHistoryModel[];
  product_subcategory!: ProductSubcategoryModal[];
  comments!: CommentsModel[];
  feedbacks!: FeedbacksModel[];
  favorite_products!: FavoriteProductsModel[];
  views!: ViewsModel[];
  subcategories: SubcategoryModel[];
  characteristics: CharacteristicsModel[];
  users_comments: UsersModel[];

  static tableName = "products";

  static get idColumn() {
    return "product_id";
  }

  static get relationMappings() {
    return {
      product_characteristics: {
        relation: Model.HasManyRelation,
        modelClass: ProductCharacteristicModel,
        join: {
          from: "product_characteristics.product",
          to: "products.product_id",
        },
      },
      characteristics: {
        relation: Model.ManyToManyRelation,
        modelClass: CharacteristicsModel,
        join: {
          from: "products.product_id",
          through: {
            from: "product_characteristics.product",
            to: "product_characteristics.characteristic",
          },
          to: "characteristics.characteristic_id",
        },
      },
      product_images: {
        relation: Model.HasManyRelation,
        modelClass: ProductsImagesModel,
        join: {
          from: "products_images.product",
          to: "products.product_id",
        },
      },
      price_history: {
        relation: Model.HasManyRelation,
        modelClass: PriceHistoryModel,
        join: {
          from: "price_history.product",
          to: "products.product_id",
        },
      },
      product_subcategory: {
        relation: Model.HasManyRelation,
        modelClass: ProductSubcategoryModal,
        join: {
          from: "product_subcategories.product",
          to: "products.product_id",
        },
      },
      feedbacks: {
        relation: Model.HasManyRelation,
        modelClass: FeedbacksModel,
        join: {
          from: "products.product_id",
          to: "feedbacks.product",
        },
      },
      favorite_products: {
        relation: Model.HasManyRelation,
        modelClass: FavoriteProductsModel,
        join: {
          from: "products.product_id",
          to: "favorite_products.product",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "comments.product",
          to: "products.product_id",
        },
      },
      views: {
        relation: Model.HasManyRelation,
        modelClass: ViewsModel,
        join: {
          from: "views.product",
          to: "products.product_id",
        },
      },
      subcategories: {
        relation: Model.ManyToManyRelation,
        modelClass: SubcategoryModel,
        join: {
          from: "products.product_id",
          through: {
            from: "product_subcategories.product",
            to: "product_subcategories.subcategory",
          },
          to: "subcategories.subcategory_id",
        },
      },
      users_comments: {
        relation: Model.ManyToManyRelation,
        modelClass: UsersModel,
        join: {
          from: "products.product_id",
          through: {
            from: "comments.product",
            extra: ["comment_id", "comment_msg"],
            to: "comments.user",
          },
          to: "users.user_id",
        },
      },
      // users_feedbacks: {
      // 	relation: Model.ManyToManyRelation,
      // 	modelClass: UsersModel,
      // 	join: {
      // 		from: "products.product_id",
      // 		through: {
      // 			from: "feedbacks.product",
      // 			extra: ["feedback_type", "created_at", "updated_at"],
      // 			to: "feedbacks.user"
      // 		},
      // 		to: "users.user_id"
      // 	}
      // },
      // users_favorite_products: {
      // 	relation: Model.ManyToManyRelation,
      // 	modelClass: UsersModel,
      // 	join: {
      // 		from: "products.product_id",
      // 		through: {
      // 			from: "favorite_products.product",
      // 			extra: ["created_at", "updated_at"],
      // 			to: "favorite_products.user"
      // 		},
      // 		to: "users.user_id"
      // 	}
      // },
      // users_views: {
      // 	relation: Model.ManyToManyRelation,
      // 	modelClass: UsersModel,
      // 	join: {
      // 		from: "products.product_id",
      // 		through: {
      // 			from: "views.product",
      // 			extra: ["created_at", "updated_at"],
      // 			to: "views.user"
      // 		},
      // 		to: "users.user_id"
      // 	}
      // },
    };
  }
}

export { ProductsModel };
