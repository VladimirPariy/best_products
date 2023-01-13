import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "store/rootSaga";

import { rootReducer } from "store/root-reducer";

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).prepend(SagaMiddleware);
  },
});

SagaMiddleware.run(rootSaga);
