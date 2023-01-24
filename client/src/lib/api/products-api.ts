import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import {
  IGetProductListTrigger,
  IProductDataResponse,
} from "lib/interfaces/products/product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";
import { ISearchData } from "lib/interfaces/search/search.interface";

class ProductsApi {
  async uploadFile({ file, id }: IUploadImage) {
    const { data } = await authAxios.post<IProductImages>(
      `${apiUrls.one_product_by_id}${id}`,
      file
    );
    return data;
  }

  async dropImage(id: number) {
    return await authAxios.delete(`${apiUrls.prod_images}${id}`);
  }

  async updateProductDetails({
    id,
    ...infoForUpdate
  }: UpdatingProductDetailsInterface) {
    return await authAxios.patch<string>(
      `${apiUrls.one_product_by_id}${id}`,
      infoForUpdate
    );
  }

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
