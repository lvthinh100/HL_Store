import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  List,
  MenuItem,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { CartProductSmall } from "./CartProduct";
import { sendCartData } from "../redux/slices/cartSlice";
import useAuth from "../hooks/useAuth";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user) dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch, user]);

  const open = Boolean(anchorEl);
  return (
    <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <IconButton onClick={() => navigate("/payment")}>
        <Badge color="secondary" badgeContent={cartItems.length} showZero>
          <LocalMallOutlinedIcon />
        </Badge>
      </IconButton>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        PaperProps={{ sx: { pointerEvents: "auto", width: "400px" } }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableRestoreFocus
      >
        {cartItems.length === 0 && (
          <Typography fontWeight="bold" sx={{ m: 1 }}>
            Find your favorite HL.Store's product
          </Typography>
        )}
        <List>
          {cartItems.map((item, index) => (
            <MenuItem key={index} sx={{ p: "5px 0" }}>
              <CartProductSmall cartItem={item} />
            </MenuItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
}
