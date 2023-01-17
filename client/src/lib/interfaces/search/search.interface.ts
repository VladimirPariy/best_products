import { ISubcategory } from "lib/interfaces/categories/categories.interface";
import { IShortProductInfo } from "lib/interfaces/products/product.interface";

export interface ISearchData {
  products: IShortProductInfo[];
  subcategories: ISubcategory[];
}
