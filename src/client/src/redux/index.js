import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";
import { retrieveUser } from "./slices/authSlice";
const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
  },
});

store.dispatch(retrieveUser());

export default store;
