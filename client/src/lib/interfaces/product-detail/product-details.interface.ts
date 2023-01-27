import { ISubcategoryWithCategory } from "lib/interfaces/categories/categories.interface";
import { IFullCharacteristicsWithParameters } from "lib/interfaces/characteristics/characteristic.interface";
import { IProductImages } from "lib/interfaces/products/upload-image.interface";

export interface IProductDetails {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  favorites_amount: number;
  views_amount: number;
  negative_feedbacks_amount: number;
  positive_feedbacks_amount: number;
  comments_amount: number;
  product_images: IProductImages[];
  characteristics: IFullCharacteristicsWithParameters[];
  subcategories: ISubcategoryWithCategory[];
}
