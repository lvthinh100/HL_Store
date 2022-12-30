import React from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  TextField,
  Stack,
} from "@mui/material";

import PaymentForm from "../components/PaymentForm";
import { CartProductDetail } from "../components/CartProduct";
import { useSelector } from "react-redux";
import { DEFAULT_VALUE } from "../config";

export default function Payment() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const tempAmount = cartItems.reduce(
    (total, cur) => total + cur.quantity * cur.price,
    0
  );
  return (
    <Container>
      <Grid container sx={{ padding: "40px 0" }}>
        <Grid item xs={7}>
          <Box sx={{ mr: "20px" }}>
            <Typography variant="h3" sx={{ mb: "20px" }}>
              Shipping Information
            </Typography>
            <PaymentForm />
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          sx={{ bgcolor: "primary.main", mr: "-2px" }}
          flexItem
        />
        <Grid item xs={5}>
          <Box sx={{ ml: "20px" }}>
            <Typography variant="h3">Cart</Typography>
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index} sx={{ padding: "10px 0" }}>
                  <CartProductDetail cartItem={item} index={index} />
                </ListItem>
              ))}
            </List>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Discount Code"
            />
            <Divider sx={{ my: "20px" }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Temporarily Amount: </Typography>
              <Typography>{tempAmount.toLocaleString()} </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Discount: </Typography>
              <Typography>0 </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Shipping fee: </Typography>
              <Typography>
                {DEFAULT_VALUE.SHIPPING_FEE.toLocaleString()}{" "}
              </Typography>
            </Stack>
            <Divider sx={{ my: "20px" }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Total Amount: </Typography>
              <Typography>
                {(tempAmount + DEFAULT_VALUE.SHIPPING_FEE).toLocaleString()}{" "}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
