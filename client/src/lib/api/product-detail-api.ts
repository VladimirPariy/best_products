import { defaultAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IProductDetails } from "lib/interfaces/product-detail/product-details";

class ProductDetailApi {
  async getProductDetail(id: number) {
    const { data } = await defaultAxios.get<IProductDetails>(
      `${apiUrls.one_product_by_id}${id}`
    );
    return data;
  }
}

export default new ProductDetailApi();