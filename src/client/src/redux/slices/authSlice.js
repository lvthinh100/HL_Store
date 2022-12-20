import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = { ...action.payload.user };
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("expired", new Date(action.payload.tokenExpires));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("expired");
      localStorage.removeItem("token");
    },
  },
});

export const retrieveUser = function () {
  //start
  return (dispatch) => {
    let user = localStorage.getItem("user");
    if (!user) return;
    user = JSON.parse(user);
    const outDated = localStorage.getItem("expired");
    const token = localStorage.getItem("token");
    const countTimeRemaining = function (outDated) {
      const currentDate = new Date().getTime();
      const nextOutDated = new Date(outDated).getTime();

      return nextOutDated - currentDate;
    };

    const timeRemaining = countTimeRemaining(outDated);
    if (timeRemaining <= 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("expired");
      localStorage.removeItem("user");
      return;
    }
    dispatch(authActions.setUser({ user, tokenExpires: outDated, token }));
  };
  //end
};

export const authActions = authSlice.actions;

export default authSlice;
