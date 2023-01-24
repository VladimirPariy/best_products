import { IDataForChangeProduct } from "lib/interfaces/products/data-for-change-product";

export interface IDataForChangeFavorite extends IDataForChangeProduct {}

export interface IFulfilledDataForRemoveFavorite
  extends Pick<IDataForChangeProduct, "productId"> {}
