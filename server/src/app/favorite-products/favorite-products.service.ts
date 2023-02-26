import { FavoriteProductsModel } from "./favorite-products.model";
import { IDataForChangeFavoriteStatus } from "./favorite-products.interface";

export default class FavoriteProductsService {
  async getFavoriteProductsByUserId(id: number) {
    return FavoriteProductsModel.query().where({ user: id });
  }

  async addProductIntoFavorite({ productId, userId }: IDataForChangeFavoriteStatus) {
    return FavoriteProductsModel.query().insert({
      user: userId,
      product: productId,
    });
  }

  async getProductFromFavoriteList({ productId, userId }: IDataForChangeFavoriteStatus) {
    return FavoriteProductsModel.query().where({ user: userId }).andWhere({ product: productId });
  }

  async removeProductFromFavorite({ productId, userId }: IDataForChangeFavoriteStatus) {
    return FavoriteProductsModel.query()
      .where({ user: userId })
      .andWhere({ product: productId })
      .del();
  }

  //singleton
  private static instance: FavoriteProductsService;
  private constructor() {}
  public static getInstance(): FavoriteProductsService {
    if (!FavoriteProductsService.instance) {
      FavoriteProductsService.instance = new FavoriteProductsService();
    }
    return FavoriteProductsService.instance;
  }
}
