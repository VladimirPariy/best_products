import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IParameters } from "lib/interfaces/parameters/parameters.interface";
import { IDataForCreating } from "lib/interfaces/products/creating-product.interface";
import {
  IGetProductListTrigger,
  IProduct,
  IProductDataResponse,
} from "lib/interfaces/products/product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";
import { ISearchData } from "lib/interfaces/search/search.interface";

class ProductsApi {
  async getAllProducts() {
    const { data } = await defaultAxios.get<IProduct[]>(apiUrls.products);
    return data;
  }

  async createNewProduct(infoForCreat: IDataForCreating) {
    const { data } = await authAxios.post<IProduct[]>(
      apiUrls.products,
      infoForCreat
    );
    return data;
  }

  async removeOneProduct(id: number) {
    return await authAxios.delete<string>(`${apiUrls.one_product_by_id}${id}`);
  }

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

  async uploadTempImage(file: FormData) {
    const { data } = await authAxios.post<IProductImages>(
      apiUrls.temp_images,
      file
    );
    return data;
  }

  async updateProductDetails({ id, ...infoForUpdate }: UpdatingProductDetailsInterface) {
    return await authAxios.patch<string>(
      `${apiUrls.one_product_by_id}${id}`,
      infoForUpdate
    );
  }

  async dropTempImage(id: number) {
    return await authAxios.delete(`${apiUrls.temp_images}${id}`);
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

  async getProductsParameters(subcategoryId: number) {
    const { data } = await defaultAxios.get<IParameters[]>(
      `${apiUrls.parameters}${subcategoryId}`
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
