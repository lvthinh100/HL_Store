import React from "react";
import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { appActions } from "../../redux/slices/appSlice";

//API
import { logout } from "../../api";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/slices/cartSlice";

//Redux

export default function UserMenu({ anchorEl, open, handleClose, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.user).role === "admin";
  const logoutHandler = async () => {
    try {
      const response = await logout();
      if (response.data.status === "success") {
        dispatch(authActions.logout());
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Log out success fully",
          })
        );
        dispatch(cartActions.clearCart());
      }
    } catch (err) {
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Something wrong happen when log you out",
        })
      );
    }
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Avatar /> {user.name}
      </MenuItem>
      <MenuItem onClick={() => navigate("/orders")}>My Orders</MenuItem>
      {isAdmin && (
        <MenuItem onClick={() => navigate("/products-manager")}>
          HL's Products
        </MenuItem>
      )}

      <Divider />
      <MenuItem onClick={logoutHandler}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
