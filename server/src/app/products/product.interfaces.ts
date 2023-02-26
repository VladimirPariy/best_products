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
  price?: number;
  product_characteristics?: string;
}

export interface ICreateProduct {
  product_title: string;
  product_description: string;
  price: number;
  price_history: IPriceHistory[];
  product_images: IProductImage[];
  product_subcategory: IProductSubcategory[];
  product_characteristics: { characteristic: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFieldsForUpdateProduct
  extends Pick<IUpdatingProductFields, "product_description" | "price" | "product_title"> {}

export interface IInsertCharacteristic {
  product: number;
  characteristic: number;
}
