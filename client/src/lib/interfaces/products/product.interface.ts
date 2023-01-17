import { ISubcategory } from "lib/interfaces/categories/categories.interface";
import { IProductImages } from "lib/interfaces/products/upload-image.interface";



export interface IProductDataResponse {
  result: IProduct[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
  orderBy: string;
  minPrice: number;
  maxPrice: number;
}

export interface IParameter {
  parameter_id: number;
  parameter_title: string;
  subcategory: number;
}

export interface ICharacteristic {
  characteristic_id: number;
  characteristic_title: string;
  parameter: number;
  parameters: IParameter;
}

export interface IProduct {
  product_id: number;
  product_title: string;
  product_description: string;
  price: string;
  product_images: IProductImages[];
  characteristics: ICharacteristic[];
  subcategories: ISubcategory[];
  negative_feedbacks: number;
  number_of_favorites: number;
  number_of_views: number;
  positive_feedbacks: number;
}

export interface IGetProductListTrigger {
  category: string;
  page: number;
  orderBy: string;
  filter: {
    subcategoryId: string | null;
    selectedParameters: string | null;
    minPrice: string | null;
    maxPrice: string | null;
  };
}

export interface IShortProductInfo {
  price: string;
  product_description: string;
  product_id: number;
  product_images: IProductImages[];
  product_title: string;
}

export interface ICounters{
  negative_feedbacks: number;
  number_of_favorites: number;
  number_of_views: number;
  positive_feedbacks: number;
}