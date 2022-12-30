import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Stack,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Counter from "./Counter";

import { SERVER_URL } from "../config";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

export function CartProductSmall({ cartItem }) {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(cartActions.removeItem({ id: cartItem.id, size: cartItem.size }));
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <CardMedia
          height="120px"
          width="100%"
          alt={`${cartItem.name}`}
          component="img"
          src={`${SERVER_URL.PRODUCT_IMAGE}/${cartItem.image}`}
          sx={{ objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Box>
          <Typography fontSize={"12px"} fontWeight="bold" whiteSpace="pre-line">
            {cartItem.name}
          </Typography>
          <Typography fontSize={"12px"} variant="subtitle1">
            {cartItem.size}
          </Typography>
          <Typography fontSize={"12px"} fontWeight="bold">
            {cartItem.price.toLocaleString()}đ
          </Typography>
          <Typography fontSize={"12px"} margin="">
            x{cartItem.quantity}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={removeItem}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export function CartProductDetail({ cartItem, index }) {
  const curSize = cartItem.inStock.findIndex((s) => s.name === cartItem.size);
  const [size, setSize] = useState(curSize);
  const dispatch = useDispatch();

  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
    dispatch(
      cartActions.updateItemSize({
        index,
        size: cartItem.inStock[e.target.value].name,
      })
    );
  };
  const quantityChangeHandler = (newValue) => {
    dispatch(cartActions.updateItemQuantity({ index, quantity: newValue }));
  };
  const removeItem = () => {
    dispatch(cartActions.removeItem({ id: cartItem.id, size: cartItem.size }));
  };

  return (
    <Card sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            height="180px"
            width="100%"
            alt="model"
            component="img"
            src={`${SERVER_URL.PRODUCT_IMAGE}/${cartItem.image}`}
            sx={{ objectFit: "scale-down" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="column"
            height="100%"
            justifyContent="space-between"
            sx={{ padding: 1 }}
          >
            <Typography fontSize={"14px"} fontWeight="bold" display="block">
              {cartItem.name}
            </Typography>
            <Stack>
              <Typography>Size: </Typography>
              <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                <Select
                  value={size}
                  onChange={sizeChangeHandler}
                  sx={{
                    width: 60,
                    height: 30,
                    fontSize: "10px",
                    "& .MuiSvgIcon-root": { fontSize: "15px" },
                  }}
                >
                  {cartItem.inStock.map((s, i) => (
                    <MenuItem key={s.name} value={i} fontSize="12px">
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="subtitle1" fontWeight="light" ml="10px">
                  (In stock: {cartItem.inStock[size].quantity})
                </Typography>
              </Stack>
              <Typography>Quantity: </Typography>
              <Counter
                min={1}
                max={cartItem.inStock[size].quantity}
                start={cartItem.quantity}
                onChange={quantityChangeHandler}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="column"
            height="100%"
            alignItems="end"
            justifyContent="space-between"
            sx={{ mr: 1 }}
          >
            <IconButton onClick={removeItem}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography>{cartItem.price.toLocaleString()}đ</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
