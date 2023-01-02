import React, { useCallback, useEffect, useState } from "react";

import { Container, Grid, Tab, Tabs, Typography, styled } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import Order from "../components/Order";
import { getOrders, updateOrderStatus } from "../api";
import { appActions } from "../redux/slices/appSlice";
const StyledTab = styled(Tab)(({ theme }) => ({
  border: "1px solid #333",
  textAlign: "left",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export default function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("ALL");

  useEffect(() => {
    const getOrdersData = async () => {
      const { data } = await getOrders();
      setOrders(data.data);
      console.log(data.data);
    };
    getOrdersData();
  }, []);

  const changeTabHandler = function (event, value) {
    setTab(value);
  };

  const filterOrder = useCallback(() => {
    if (tab === "ALL") return orders;
    return orders.filter((or) => or.status === tab);
  }, [orders, tab]);

  const handleUpdateOrderStatus = async function (orderId, status) {
    const updatedOrderIndex = orders.findIndex(
      (order) => order._id === orderId
    );
    if (orders[updatedOrderIndex].status === status) return;
    const newOrders = [...orders];
    newOrders[updatedOrderIndex].status = status;
    setOrders(newOrders);
    try {
      await updateOrderStatus(orderId, status);
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Update order status success",
        })
      );
    } catch (err) {
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Failed to update order status success",
        })
      );
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ py: 3 }} variant="h4" textAlign="center">
            {`${user.name}'s Orders`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tabs value={tab} onChange={changeTabHandler} orientation="vertical">
            <StyledTab label="ALL" value="ALL" />
            <StyledTab label="UNCONFIRMED" value="UNCONFIRMED" />
            <StyledTab label="CONFIRMED" value="CONFIRMED" />
            <StyledTab label="PACKED" value="PACKED" />
            <StyledTab label="DELIVERING" value="DELIVERING" />
            <StyledTab label="SUCCESS" value="SUCCESS" />
          </Tabs>
        </Grid>
        <Grid item xs={10}>
          {filterOrder().map((order) => (
            <Order
              key={order._id}
              order={order}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
