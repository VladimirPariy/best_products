import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
	IDataForChangeFavorite,
	IFulfilledDataForRemove,
} from "lib/interfaces/favorite/favorite.interface";
import FavoriteProductsApi from "lib/api/favorite-products-api";
import {
	removeFromFavoriteFulfilled,
	changeFavoritePending,
	changeFavoriteRejected,
	removeFromFavoriteTrigger,
} from "store/favorite-products/favorite-products-actions";
import { decrementFavoriteCounter } from "store/products/products-actions";

function* removeFromFavoriteWorker({
	payload,
}: PayloadAction<IDataForChangeFavorite>) {
	yield put(changeFavoritePending());
	try {
		const res: IFulfilledDataForRemove = yield call(
			FavoriteProductsApi.removeFromFavorite,
			payload
		);

		yield put(removeFromFavoriteFulfilled(res));
		yield put(decrementFavoriteCounter(res.productId));
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

export function* removeFromFavoriteWatcher() {
	yield takeLatest(removeFromFavoriteTrigger.type, removeFromFavoriteWorker);
}
