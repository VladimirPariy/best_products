import {ICategory, ISubcategory} from "lib/interfaces/categories/categories.interface";
import {ICharacteristic} from "lib/interfaces/characteristics/characteristic";
import {IPriceHistory} from "lib/interfaces/products/product";
import {IProductImages} from "lib/interfaces/products/upload-image";

export interface IProductDetails {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  product_images: IProductImages[];
  product_subcategory: ISubcategory[];
  category: ICategory[];
  price_history: IPriceHistory[];
  product_characteristics: ICharacteristic[];
}