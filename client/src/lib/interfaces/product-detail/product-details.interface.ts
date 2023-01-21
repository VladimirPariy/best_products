import { ShotSubcategoryWithCategory } from "lib/interfaces/categories/categories.interface";
import { ICharacteristicsWithParameters } from "lib/interfaces/characteristics/characteristic.interface";
import { IShotImagesInfo } from "lib/interfaces/products/upload-image.interface";

export interface IProductDetails {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  negative_feedbacks_amount: number;
  favorites_amount: number;
  views_amount: number;
  positive_feedbacks_amount: number;
  characteristics: ICharacteristicsWithParameters[];
  product_images: IShotImagesInfo[];
  comments_amount: number;
  subcategories: ShotSubcategoryWithCategory[];
}
