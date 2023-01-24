import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IFulfilledDataForRemove } from "lib/interfaces/favorite/favorite.interface";
import { IDataForCreating } from "lib/interfaces/products/creating-product.interface";
import { IProduct } from "lib/interfaces/products/product.interface";
import { UpdatingProductDetailsInterface } from "lib/interfaces/products/updating-product-details.interface";
import {
  IProductImages,
  IUploadImage,
} from "lib/interfaces/products/upload-image.interface";

class ProductControlApi {
  async addView(productId: number) {
    return await defaultAxios.post(apiUrls.view, { productId });
  }

  async createNewProduct(infoForCreat: IDataForCreating) {
    const { data } = await authAxios.post<IProduct[]>(
      apiUrls.products,
      infoForCreat
    );
    return data;
  }

  async uploadTempImage(file: FormData) {
    const { data } = await authAxios.post<IProductImages>(
      apiUrls.temp_images,
      file
    );
    return data;
  }

  async dropTempImage(id: number) {
    return await authAxios.delete(`${apiUrls.temp_images}${id}`);
  }

  async removeOneProduct(id: number) {
    const { data } = await authAxios.delete<IFulfilledDataForRemove>(
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

  async updateProductDetails({
    id,
    ...infoForUpdate
  }: UpdatingProductDetailsInterface) {
    return await authAxios.patch<string>(
      `${apiUrls.one_product_by_id}${id}`,
      infoForUpdate
    );
  }
}

export default new ProductControlApi();
