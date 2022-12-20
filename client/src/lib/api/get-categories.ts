import {defaultAxios} from "lib/api/axios-instances";
import {ApiUrls} from "lib/enums/api-urls";
import {ICategory} from "lib/interfaces/categories/categories.interface";


export const getCategories = async () => {
  const {data} = await defaultAxios.get<ICategory[]>(ApiUrls.allCategories)
  return data
}