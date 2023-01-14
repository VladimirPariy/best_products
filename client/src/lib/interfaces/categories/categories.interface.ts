export interface ISubcategory {
  subcategory_id: number;
  category: number;
  subcategory_title: string;
  background_image: string;
}

export interface ICategory {
  category_id: number;
  category_title: string;
  icon: string;
}
export interface ICategoryWithSubcategory extends ICategory {
  subcategories: ISubcategory[];
}

export interface ShotSubcategoryWithCategory
  extends Pick<ISubcategory, "subcategory_title" | "subcategory_id"> {
  categories: Omit<ICategory, "icon">;
}
