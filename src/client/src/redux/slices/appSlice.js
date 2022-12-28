import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAuthModal: false,
  notification: {
    open: false,
    variant: "success",
    message: "Hello world",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleShowAuthModal(state) {
      state.showAuthModal = !state.showAuthModal;
    },
    showAuthModal(state) {
      state.showAuthModal = true;
    },
    showNotification(state, action) {
      state.notification = { open: true, ...action.payload };
    },
    hideNotification(state) {
      state.notification = { ...state.notification, open: false };
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
