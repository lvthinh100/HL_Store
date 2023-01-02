import {
  Card,
  List,
  ListItem,
  Grid,
  CardMedia,
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../config";
import formatDate from "../utils/dateFormat";

const OrderProduct = function ({ product }) {
  return (
    <Grid
      container
      sx={{ border: "solid #333", borderWidth: "1px 0", padding: "10px 0" }}
    >
      <Grid item xs={2}>
        <CardMedia
          height="140px"
          width="100%"
          alt="model"
          component="img"
          src={`${SERVER_URL.PRODUCT_IMAGE}/${product.image}`}
          sx={{ objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={10}>
        <Box>
          <Typography fontSize={"12px"} fontWeight="bold" whiteSpace="pre-line">
            {product.name}
          </Typography>
          <Typography fontSize={"12px"} variant="subtitle1">
            Size: {product.size}
          </Typography>
          <Typography fontSize={"12px"} fontWeight="bold">
            {product.price.toLocaleString()}đ
          </Typography>
          <Typography fontSize={"12px"} margin="">
            Quantity: x{product.quantity}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const OrderStatus = function ({ status }) {
  return (
    <Stack direction="row" alignItems="center">
      <Typography>Status: </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.success.main,
          fontWeight: "bold",
        }}
      >
        {status}
      </Typography>
    </Stack>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Order({ order, onUpdateStatus }) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [status, setStatus] = useState(order.status);
  const statusChangeHandler = function (e) {
    setStatus(e.target.value);
  };

  const confirmUpdateStatusHandler = function () {
    onUpdateStatus(order._id, status);
  };

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user.role === "admin";

  return (
    <Fragment>
      <Card sx={{ mb: 2, p: 3, border: "1px solid #333" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="bold">Order id: {order._id}</Typography>
          <OrderStatus status={order.status} />
        </Stack>
        <List sx={{ p: 0, "& li": { p: 0 } }}>
          {order.products.map((prod) => (
            <ListItem key={prod.id}>
              <OrderProduct product={prod} />
            </ListItem>
          ))}
        </List>
        <Typography sx={{ my: 2 }}>
          Total Amount: {order.totalAmount.toLocaleString()}đ
        </Typography>
        <Stack direction="row" alignItems="center">
          {!isAdmin && (
            <Button sx={{ mr: 1 }} variant="contained">
              SUCCESS
            </Button>
          )}
          <Button variant="outlined" onClick={openModal}>
            SHIPPING INFORMATION
          </Button>
          <Box sx={{ ml: "auto" }}>
            <Typography>{formatDate(order.createdAt)}</Typography>
          </Box>
        </Stack>
      </Card>
      <Modal open={open} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant="h4">Shipping information</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Name</Typography>
              <Typography>{order.nameCustomer}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Phone</Typography>
              <Typography> {order.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Email</Typography>
              <Typography> {order.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Address</Typography>
              <Typography> {order.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Note</Typography>
              <Typography>{order.note}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">Status</Typography>
              {!isAdmin && <Typography>{order.status}</Typography>}
              {isAdmin && (
                <Select
                  value={status}
                  onChange={statusChangeHandler}
                  sx={{ width: "100px", height: "40px" }}
                >
                  <MenuItem value={"UNCONFIRMED"}>UNCONFIRMED</MenuItem>
                  <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                  <MenuItem value={"PACKED"}>PACKED</MenuItem>
                  <MenuItem value={"DELIVERING"}>DELIVERING</MenuItem>
                  <MenuItem value={"SUCCESS"}>SUCCESS</MenuItem>
                </Select>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider color="primary" />
            </Grid>
            {isAdmin && (
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    onClick={confirmUpdateStatusHandler}
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    SAVE CHANGE
                  </Button>
                  <Button variant="outlined" onClick={closeModal}>
                    CANCEL
                  </Button>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    </Fragment>
  );
}
