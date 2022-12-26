import { defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { ICategory } from "lib/interfaces/categories/categories.interface";

export const categoriesApi = async () => {
  const { data } = await defaultAxios.get<ICategory[]>(apiUrls.all_categories);
  return data;
};


