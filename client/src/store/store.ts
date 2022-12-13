import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {rootReducer} from "store/root-reducer";
import rootSaga from "store/rootSaga";

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({thunk: false}).prepend(SagaMiddleware);
  }
});

SagaMiddleware.run(rootSaga);


