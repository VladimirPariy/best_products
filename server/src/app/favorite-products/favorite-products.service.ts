import { FavoriteProductsModel } from "@/app/favorite-products/favorite-products.model";
import ProductService from "@/app/products/product.service";
import { HttpException } from "@/app/common/errors/exceptions";

class FavoriteProductsService {
  async getFavoriteProductsByUserId(id: number) {
    const favoriteProducts = await FavoriteProductsModel.query()
      .where({ user: id })
      .then((data) => data.map((item) => item.product));
    return ProductService.getProductOrProducts(favoriteProducts);
  }

  async addProductIntoFavorite(userId: number, productId: number) {
    const isExistInList = await FavoriteProductsModel.query()
      .where({ user: userId })
      .andWhere({ product: productId });
    if (isExistInList.length > 0) {
      return HttpException.alreadyExists(
        "The product is already in the favorite list"
      );
    }
    const addedInfo = await FavoriteProductsModel.query().insert({
      user: userId,
      product: productId,
    });
    return ProductService.getProductOrProducts(addedInfo.product);
  }

  async removeProductFromFavorite(userId: number, productId: number) {
    const isExistInList = await FavoriteProductsModel.query()
      .where({ user: userId })
      .andWhere({ product: productId });
    if (isExistInList.length === 0) {
      return HttpException.alreadyExists(
        "The product is already removed from the favorite list"
      );
    }
    const removed = await FavoriteProductsModel.query()
      .where({ user: userId })
      .andWhere({ product: productId })
      .del();
    return { userId, productId, status: "Successful removed", amount: removed };
  }
}

export default new FavoriteProductsService();
