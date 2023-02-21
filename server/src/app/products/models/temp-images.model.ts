import { Model } from "objection";

export class TempImagesModel extends Model {
  image_id: number;
  image_title: string;
  original_title: string;
  size: number;

  static get tableName() {
    return "temp_images";
  }

  static get idColumn() {
    return "image_id";
  }
}
