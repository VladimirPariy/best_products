import { authAxios } from "lib/api/axios-instances";
import { apiUrls } from "lib/enums/api-urls";
import { IDataForChangeFavorite } from "lib/interfaces/favorite/favorite";
import { IProduct } from "lib/interfaces/products/product.interface";

class FavoriteProductsApi {
  async getFavoriteProducts(id: number) {
    const { data } = await authAxios.get<IProduct[]>(
      `${apiUrls.favorite}${id}`
    );
    return data;
  }

  async addIntoFavorite(infoForAdd: IDataForChangeFavorite) {
    const { data } = await authAxios.post(apiUrls.favorite, infoForAdd);
    return data;
  }

  async removeFromFavorite(infoForRemove: IDataForChangeFavorite) {
    const { data } = await authAxios.delete(apiUrls.favorite, {
      data: infoForRemove,
    });
    return data;
  }
}

export default new FavoriteProductsApi();
