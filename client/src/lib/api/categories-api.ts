import { defaultAxios } from "lib/api/axios-instances";
import { ApiUrls } from "lib/enums/api-urls";
import { ICategory } from "lib/interfaces/categories/categories.interface";



export const categoriesApi = async () => {
  const { data } = await defaultAxios.get<ICategory[]>(ApiUrls.allCategories);
  return data;
};



export interface ISubcategories {
  subcategory_id: number;
  category: number;
  subcategory_title: string;
}

export const getSubcategories = async (id: number) => {
  const { data } = await defaultAxios.get<ISubcategories[]>(
    `${ApiUrls.subcategoriesOfCategory}${id}`
  );
  return data;
};
