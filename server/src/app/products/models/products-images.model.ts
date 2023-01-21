import { Model, QueryBuilder } from "objection";

import { ProductsModel } from "@/app/products/models/products.model";

class ProductsImagesModel extends Model {
  image_id: number;
  product: number;
  image_title: string;
  original_title: string;
  size: number;

  static get tableName() {
    return "products_images";
  }

  static get idColumn() {
    return "image_id";
  }

  static get modifiers() {
    return {
      selectShotImage: (builder: QueryBuilder<any, any>) => {
        builder.select("image_id", "image_title");
      },
    };
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasOneRelation,
        modelClass: ProductsModel,
        join: {
          from: "products_images.product",
          to: "products.product_id",
        },
      },
    };
  }
}

export { ProductsImagesModel };
