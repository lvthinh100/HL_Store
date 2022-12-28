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
  Menu,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const OrderProduct = function () {
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
          src="http://localhost:3000/img/model.jpg"
          sx={{ objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={10}>
        <Box>
          <Typography fontSize={"12px"} fontWeight="bold" whiteSpace="pre-line">
            Modal Ultra Warm men's shirt - warm and breathable to wear
            aaaaaaaaaaaa
          </Typography>
          <Typography fontSize={"12px"} variant="subtitle1">
            XL
          </Typography>
          <Typography fontSize={"12px"} fontWeight="bold">
            250.000đ
          </Typography>
          <Typography fontSize={"12px"} margin="">
            x10
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const OrderStatus = function () {
  return (
    <Stack direction="row" alignItems="center">
      <Typography>Status: </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.success.main,
          fontWeight: "bold",
        }}
      >
        DELIVERING
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

export default function Order() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user.role === "admin";
  return (
    <Fragment>
      <Card sx={{ mb: 2, p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="bold">Order id: MADKLSJCB!12</Typography>
          <OrderStatus />
        </Stack>
        <List sx={{ p: 0, "& li": { p: 0 } }}>
          <ListItem>
            <OrderProduct />
          </ListItem>
          <ListItem>
            <OrderProduct />
          </ListItem>
        </List>
        <Typography sx={{ my: 2 }}>Total Amount: 250.000đ</Typography>
        <Stack direction="row" alignItems="center">
          <Button variant="contained">RECEIVED</Button>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={openModal}>
            SHIPPING INFORMATION
          </Button>
        </Stack>
      </Card>
      <Modal open={open} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant="h4">Shipping information</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Name</Typography>
              <Typography> Le Van Thinh</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Phone</Typography>
              <Typography> 0796792539</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Email</Typography>
              <Typography> levanthinh2509@gmail.com</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Address</Typography>
              <Typography> Kp Long hai bac P.Xuan yen</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">Note</Typography>
              <Typography>Please dont send at work</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">Status</Typography>
              {!isAdmin && <Typography>Delivering...</Typography>}
              {isAdmin && (
                <Select sx={{ width: "100px", height: "40px" }}>
                  <MenuItem>UNCONFIRMED</MenuItem>
                  <MenuItem>CONFIRMED</MenuItem>
                  <MenuItem>PACKED</MenuItem>
                  <MenuItem>DELIVERING</MenuItem>
                  <MenuItem>SUCCESS</MenuItem>
                </Select>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider color="primary" />
            </Grid>
            {isAdmin && (
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" sx={{ mr: 1 }}>
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
