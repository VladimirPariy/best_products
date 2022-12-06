import {Comments} from "@/database/models/comments/comments";
import {Category} from "@/database/models/products/categories";
import {Characteristics, ProdCharacteristic} from "@/database/models/products/characteristics";
import {PriceHistory} from "@/database/models/products/price-history";
import {ProductImage} from "@/database/models/products/product-image";
import {Subcategory} from "@/database/models/products/subcatigories";
import {Users} from "@/database/models/users/users";
import {Model} from "objection";


class Product extends Model {
  static get tableName() {
    return "products";
  };

  static get idColumn() {
    return "product_id";
  }

  static relationMappings = {
    prod_characteristic: {
      relation: Model.HasManyRelation,
      modelClass: ProdCharacteristic,
      join: {
        from: "prod_characteristic.product",
        to: "products.product_id"
      }
    },
    characteristics: {
      relation: Model.ManyToManyRelation,
      modelClass: Characteristics,
      join: {
        from: "products.product_id",
        through: {
          from: "prod_characteristic.product",
          extra: ["characteristic_description"],
          to: "prod_characteristic.characteristic"
        },
        to: "characteristics.characteristic_id"
      }
    },
    products_images: {
      relation: Model.HasManyRelation,
      modelClass: ProductImage,
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
    categories: {
      relation: Model.HasOneRelation,
      modelClass: Category,
      join: {
        from: "products.category",
        to: "categories.category_id"
      }
    }, //????


    users_comments: {
      relation: Model.ManyToManyRelation,
      modelClass: Users,
      join: {
        from: "products.product_id",
        through: {
          from: "comments.product",
          extra:["comments_id", "comments_msg"],
          to: "comments.user"
        },
        to: "users.user_id"
      }
    },
    comments:{
      relation: Model.HasManyRelation,
      modelClass: Comments,
      join: {
        from: "comments.product",
        to: "products.product_id"
      }
    },


  };
}

export {Product}


