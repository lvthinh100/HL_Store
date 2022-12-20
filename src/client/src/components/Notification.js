import React from "react";
import { Snackbar, Alert } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../redux/slices/appSlice";

export default function Notification({ type }) {
  const { open, variant, message } = useSelector(
    (state) => state.app.notification
  );
  const dispatch = useDispatch();
  const hide = () => dispatch(appActions.hideNotification());
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={hide}>
      <Alert severity={variant} sx={{ width: "100%" }} onClose={hide}>
        {message}
      </Alert>
    </Snackbar>
  );
}
