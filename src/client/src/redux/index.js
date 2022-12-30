import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

import { retrieveUser } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

store.dispatch(retrieveUser());

export default store;
