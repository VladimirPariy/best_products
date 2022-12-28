import { defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { ICategoryWithSubcategory } from "lib/interfaces/categories/categories.interface";

export const categoriesApi = async () => {
  const { data } = await defaultAxios.get<ICategoryWithSubcategory[]>(
    apiUrls.all_categories
  );
  return data;
};
