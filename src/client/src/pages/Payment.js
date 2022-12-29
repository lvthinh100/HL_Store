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

export default function Payment() {
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
              <ListItem sx={{ padding: "10px 0" }}>
                <CartProductDetail />
              </ListItem>
              <ListItem sx={{ padding: "10px 0" }}>
                <CartProductDetail />
              </ListItem>
              <ListItem sx={{ padding: "10px 0" }}>
                <CartProductDetail />
              </ListItem>
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
              <Typography>250.000 </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Discount: </Typography>
              <Typography>50.000 </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Shipping fee: </Typography>
              <Typography>250.000 </Typography>
            </Stack>
            <Divider sx={{ my: "20px" }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Total Amount: </Typography>
              <Typography>250.000 </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
