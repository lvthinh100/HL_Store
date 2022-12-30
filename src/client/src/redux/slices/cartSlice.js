import { createSlice } from "@reduxjs/toolkit";
import { getCart, updateCart } from "../../api";
import { appActions } from "./appSlice";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = [...action.payload];
    },
    clearCart(state) {
      state.cartItems = [];
    },
    addItems(state, action) {
      //  payload { id, name, size, price, img, quantity. inStock: [] }
      const product = action.payload;
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existedItemIndex === -1) {
        state.cartItems.push({
          ...product,
        });
        return;
      }
      state.cartItems[existedItemIndex].quantity += product.quantity;
    },
    removeItem(state, action) {
      const product = action.payload;
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      const newArr = state.cartItems.filter(
        (item, i) => i !== existedItemIndex
      );
      state.cartItems = [...newArr];
    },
    updateItemSize(state, action) {
      // payload { index, size }
      state.cartItems[action.payload.index].size = action.payload.size;
    },
    updateItemQuantity(state, action) {
      // payload { index, quantity }
      const { index, quantity } = action.payload;
      state.cartItems[index].quantity = quantity;
    },
    increaseItem(state, action) {
      // action.payload = index
      state.cartItems[action.payload].quantity++;
    },
    decreaseItem(state, action) {
      const itemIndex = action.payload;
      if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems.splice(itemIndex, 1);
        return;
      }
      state.cartItems[itemIndex].quantity--;
    },
  },
});

export const sendCartData = function (cart) {
  return async (dispatch) => {
    try {
      await updateCart(cart);
    } catch (err) {
      console.log(err);
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Something wrong happen when updating cart",
        })
      );
    }
  };
};

export const getCartData = function () {
  return async (dispatch) => {
    try {
      const { data } = await getCart();
      if (data.status === "success")
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Get cart data success",
          })
        );
      dispatch(cartActions.setCart(data.data));
    } catch (err) {
      console.log(err);
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Something wrong happen when updating cart",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
