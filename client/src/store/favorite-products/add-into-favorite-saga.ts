import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { IDataForChangeFavorite } from "lib/interfaces/favorite/favorite.interface";
import { IProduct } from "lib/interfaces/products/product.interface";
import {
	addIntoFavoriteFulfilled,
	changeFavoritePending,
	changeFavoriteRejected,
	addIntoFavoriteTrigger,
} from "store/favorite-products/favorite-products-actions";
import FavoriteProductsApi from "lib/api/favorite-products-api";
import { incrementFavoriteCounter } from "store/products/products-actions";

function* addIntoFavoriteWorker({
	payload,
}: PayloadAction<IDataForChangeFavorite>) {
	yield put(changeFavoritePending());
	try {
		const res: IProduct = yield call(
			FavoriteProductsApi.addIntoFavorite,
			payload
		);

		yield put(addIntoFavoriteFulfilled(res));
		yield put(incrementFavoriteCounter(res.product_id));
	} catch (error) {
		if (error instanceof AxiosError)
			yield put(
				changeFavoriteRejected({
					status_message: error.request.response,
					status: error.request.status,
				})
			);
	}
}

export function* addIntoFavoriteWatcher() {
	yield takeLatest(addIntoFavoriteTrigger.type, addIntoFavoriteWorker);
}
