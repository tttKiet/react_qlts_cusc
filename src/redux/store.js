import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/accountSlide";

export const store = configureStore({
  reducer: { account: accountReducer },
});
 