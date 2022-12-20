import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "lib/store/rootSaga";

import {rootReducer} from "lib/store/root-reducer";

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
