export interface ICategory {
  category_id: number;
  category_title: string;
  subcategories: {
    subcategory_id: number;
    category: number;
    subcategory_title: string;
  }[];
}
