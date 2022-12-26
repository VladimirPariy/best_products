import {authAxios, defaultAxios} from "lib/api/axios-instances";
import {apiUrls} from "lib/enums/api-urls";
import {IProduct} from "lib/interfaces/products/product";

class ProductsApi {
  async getAllProducts() {
    const {data} = await defaultAxios.get<IProduct[]>(apiUrls.products);
    return data;
  }

  async createNewProduct(formData: FormData) {
    const {data} = await authAxios.post<string>(apiUrls.products, formData, {
      headers: {"Content-Type": "multipart/form-data"}
    });
    return data;
  }

  async removeOneProduct(id: number) {
    const {data} = await authAxios.delete<string>(`${apiUrls.one_product_by_id}${id}`);
    return data
  }
}

export default new ProductsApi();
