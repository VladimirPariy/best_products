import {Model} from "objection";

import {ProductsModel} from "@/app/products/models/products.model";


class ProductsImagesModel extends Model {
	image_id:number;
	product:number;
	image_title:string;

  static get tableName() {
    return "products_images";
  }

  static get idColumn() {
    return "image_id";
  }

  static relationMappings = {
    products: {
      relation: Model.HasOneRelation,
      modelClass: ProductsModel,
      join: {
        from: "products_images.product",
        to: "products.product_id"
      }
    }
  }
}

export {ProductsImagesModel};