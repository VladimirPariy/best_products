import { ICharacteristic } from "lib/interfaces/characteristics/characteristic";
import { IProductImages } from "lib/interfaces/products/upload-image";

export interface IPriceHistory {
  created_at: string;
  price_at_timestamp: string;
  price_history_id: number;
  product: number;
  updated_at: string;
}

export interface IProduct {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  product_images: IProductImages[];
  product_characteristics: ICharacteristic[];
}
