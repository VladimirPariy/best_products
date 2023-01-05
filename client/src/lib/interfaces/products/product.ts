import {ICharacteristic} from "lib/interfaces/characteristics/characteristic";
import {IProductImages} from "lib/interfaces/products/upload-image";

export interface IPriceHistory {
  created_at: string;
  price_at_timestamp: string;
  price_history_id: number;
  product: number;
  updated_at: string;
}

export interface IProductDataResponse {
  result: IProduct[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
  orderBy: string
}


export interface IProduct {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  product_images: IProductImages[];
  characteristics: {
    characteristic_id: number;
    characteristic_title: string;
    parameter: number;
    parameters: {
      parameter_id: number
      parameter_title: string
      subcategory: number
    };
  }[];
  subcategories: {
    background_image: string;
    category: number;
    subcategory_id: number;
    subcategory_title: string;
  }[];
  negative_feedbacks: number;
  number_of_favorites: number;
  number_of_views: number;
  positive_feedbacks: number;
}


export interface IGetProductListTrigger {
  category: string,
  page: number,
  orderBy: string
}