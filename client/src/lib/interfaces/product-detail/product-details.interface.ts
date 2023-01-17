import {ShotSubcategoryWithCategory} from "lib/interfaces/categories/categories.interface";
import {ICharacteristicsWithParameters} from "lib/interfaces/characteristics/characteristic.interface";
import {ShotCommentsWithUser} from "lib/interfaces/comments/comments.interface";
import {IShotPriceHistory} from "lib/interfaces/price-history/price-history.interface";
import {IShotImagesInfo} from "lib/interfaces/products/upload-image.interface";

export interface IProductDetails {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  negative_feedbacks: number;
  number_of_favorites: number;
  number_of_views: number;
  positive_feedbacks: number;
  characteristics: ICharacteristicsWithParameters[];
  price_history: IShotPriceHistory[];
  product_images: IShotImagesInfo[];
  comments: ShotCommentsWithUser[];
  subcategories: ShotSubcategoryWithCategory[];
}
