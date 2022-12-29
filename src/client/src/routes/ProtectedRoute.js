import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { appActions } from "../redux/slices/appSlice";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (!user) {
    dispatch(appActions.showAuthModal());
    console.log("Not auth");
  }
  return <div>{user ? children : <Navigate to={"/"} />}</div>;
}
