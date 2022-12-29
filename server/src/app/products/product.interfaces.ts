export interface IInfoForCreateProduct {
  category: string;
  subcategory: string;
  productTitle: string;
  productDescription: string;
  price: string;
  characteristics: string;
  images: string;
}

export interface ICharacteristic {
  characteristic_description: string;
  characteristic_title: string;
  id: number;
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

export interface ProdCharacteristicReq {
  product_characteristic_id?: number;
  product?: number;
  id?: number;
  characteristic_title: string;
  characteristic_description: string;
}
