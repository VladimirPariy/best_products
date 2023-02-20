import { FavoriteProductsModel } from "./favorite-products.model";
import { IDataForChangeFavoriteStatus } from "./favorite-products.interface";

export default class FavoriteProductsService {
  private static instance: FavoriteProductsService;

  private constructor() {}

  public static getInstance(): FavoriteProductsService {
    if (!FavoriteProductsService.instance) {
      FavoriteProductsService.instance = new FavoriteProductsService();
    }
    return FavoriteProductsService.instance;
  }

  async getFavoriteProductsByUserId(id: number) {
    return FavoriteProductsModel.query().where({ user: id });
  }

  async addProductIntoFavorite(data: IDataForChangeFavoriteStatus) {
    const { productId, userId } = data;
    return FavoriteProductsModel.query().insert({
      user: userId,
      product: productId,
    });
  }

  async getProductFromFavoriteList(data: IDataForChangeFavoriteStatus) {
    const { productId, userId } = data;
    return FavoriteProductsModel.query().where({ user: userId }).andWhere({ product: productId });
  }

  async removeProductFromFavorite(data: IDataForChangeFavoriteStatus) {
    const { productId, userId } = data;
    return FavoriteProductsModel.query()
      .where({ user: userId })
      .andWhere({ product: productId })
      .del();
  }
}
