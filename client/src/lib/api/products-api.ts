import { defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {
  IGetProductListTrigger,
  IProductDataResponse,
} from "lib/interfaces/products/product.interface";
import { ISearchData } from "lib/interfaces/search/search.interface";

class ProductsApi {
  async getFilteredAndSortedProducts({
    category,
    page,
    orderBy,
    filter,
  }: IGetProductListTrigger) {
    const { data } = await defaultAxios.get<IProductDataResponse>(
      apiUrls.filtered_prod,
      {
        params: {
          category,
          page,
          orderBy,
          filter,
        },
      }
    );
    return data;
  }

  async search(search: string) {
    return await defaultAxios.get<ISearchData>(apiUrls.search, {
      params: { search },
    });
  }
}

export default new ProductsApi();
