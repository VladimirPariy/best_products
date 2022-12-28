export interface IInfoForCreateProduct {
  category: string;
  subcategory: string;
  productTitle: string;
  productDescription: string;
  price: string;
  characteristics: string;
}

export interface ICharacteristic {
  characteristic_description: string;
  characteristic_title: string;
  id: number;
}



export interface IProductImage {
  image_title: string
	original_title:string;
	size:number;
}

export interface IPriceHistory {
  price_at_timestamp: number
}

export interface IProductSubcategory {
  subcategory: number
}