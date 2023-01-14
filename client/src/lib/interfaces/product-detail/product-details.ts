import { ShotSubcategoryWithCategory } from "lib/interfaces/categories/categories.interface";
import { ICharacteristicsWithParameters } from "lib/interfaces/characteristics/characteristic";
import { ShotCommentsWithUser } from "lib/interfaces/comments/comments.interface";
import { IPriceHistory } from "lib/interfaces/products/product";
import { IProductImages } from "lib/interfaces/products/upload-image";

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
  price_history: Omit<IPriceHistory, "product">[];
  product_images: Pick<IProductImages, "image_id" | "image_title">[];
  comments: ShotCommentsWithUser[];

  subcategories: ShotSubcategoryWithCategory[];
}
