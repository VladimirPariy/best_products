import { authAxios, defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IProduct } from "lib/interfaces/products/product";
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

  async createNewProduct(formData: FormData) {
    const { data } = await authAxios.post<string>(apiUrls.products, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }

  async removeOneProduct(id: number) {
    const { data } = await authAxios.delete<string>(
      `${apiUrls.one_product_by_id}${id}`
    );
    return data;
  }

  async getProductDetail(id: number) {
    const { data } = await defaultAxios.get<IProduct>(
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
    const data = await authAxios.delete(`${apiUrls.prod_images}${id}`);
    return data;
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
    const data = await authAxios.delete(`${apiUrls.temp_images}${id}`);
    return data;
  }
}

export default new ProductsApi();
