export interface IInfoForCreateProduct {
  category: string;
  subcategory: string;
  productTitle: string;
  productDescription: string;
  price: string;
  characteristics: string;
  images: string;
}

export interface IProductImage {
  image_title: string;
  original_title: string;
  size: number;
  image_id?: number;
}

export interface IPriceHistory {
  price_at_timestamp: number;
}

export interface IProductSubcategory {
  subcategory: number;
}

export interface IUpdatingProductFields {
  product_subcategory?: number;
  category?: number;
  product_title?: string;
  product_description?: string;
  price?: string;
  product_characteristics?: string;
}
