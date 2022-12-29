export interface ITempChar {
  characteristic_title: string;
  characteristic_description: string;
  id: number;
}

export interface IDataForCreating{
  category:number;
  subcategory:number;
  productTitle:string;
  productDescription:string;
  price:number;
  characteristics:string;
  images:string;
}