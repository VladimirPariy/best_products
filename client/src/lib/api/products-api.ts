import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IParametersDataFromServer } from "lib/interfaces/parameters/parameters.interface";
import { IDataForCreating } from "lib/interfaces/products/creating-product";
import {
  IProduct,
  IProductDataResponse,
} from "lib/interfaces/products/product";
import { IProductDetails } from "lib/interfaces/products/product-details";
import { UpdatingProductDetails } from "lib/interfaces/products/updating-product-details";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image";

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

  async getProductDetail(id: number) {
    const { data } = await defaultAxios.get<IProductDetails>(
      `${apiUrls.one_product_by_id}${id}`
    );
    return data;
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

  async updateProductDetails({ id, ...infoForUpdate }: UpdatingProductDetails) {
    return await authAxios.patch<string>(
      `${apiUrls.one_product_by_id}${id}`,
      infoForUpdate
    );
  }

  async dropTempImage(id: number) {
    return await authAxios.delete(`${apiUrls.temp_images}${id}`);
  }

  async getFilteredProducts({
    category,
    page,
    orderBy,
  }: {
    category: string;
    page: number;
    orderBy: string;
  }) {
    const { data } = await defaultAxios.get<IProductDataResponse>(
      apiUrls.filtered_prod,
      {
        params: {
          category,
          page,
          orderBy,
        },
      }
    );
    return data;
  }

  async getProductsParameters(subcategoryId: number) {
    const { data } = await defaultAxios.get<IParametersDataFromServer[]>(
      `${apiUrls.parameters}${subcategoryId}`
    );
    return data;
  }
}

export default new ProductsApi();
