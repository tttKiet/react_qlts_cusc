import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountReducer from "./account/accountSlide";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  account: accountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
let persistor = persistStore(store);

export { store, persistor };
