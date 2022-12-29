import React from "react";

import { useSelector } from "react-redux";

import { Container, Grid, Tab, Tabs, Typography, styled } from "@mui/material";
import Order from "../components/Order";

const StyledTab = styled(Tab)(({ theme }) => ({
  border: "1px solid #333",
  textAlign: "left",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export default function Orders() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ py: 3 }} variant="h4" textAlign="center">
            {`${user.name}'s Orders`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tabs value="ALL" orientation="vertical">
            <StyledTab label="ALL" value="ALL" />
            <StyledTab label="UNCONFIRMED" />
            <StyledTab label="CONFIRMED" />
            <StyledTab label="PACKED" />
            <StyledTab label="DELIVERING" />
            <StyledTab label="SUCCESS" />
          </Tabs>
        </Grid>
        <Grid item xs={10}>
          <Order />
          <Order />
          <Order />
        </Grid>
      </Grid>
    </Container>
  );
}
