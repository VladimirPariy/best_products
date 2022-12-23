interface IProductImages{
  image_id:number;
  image_title:string;
  product:number;
}

export interface IProduct{
  product_id:number;
  product_title:string;
  product_description:string;
  price:number;
  product_images:IProductImages[];
}