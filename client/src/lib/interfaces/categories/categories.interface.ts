export interface ISubcategory{
  subcategory_id: number;
  category: number;
  subcategory_title: string;
}

export interface ICategoryWithSubcategory {
  category_id: number;
  category_title: string;
  subcategories: ISubcategory[];
}

export interface ICategory{
  category_id: number;
  category_title: string;
}