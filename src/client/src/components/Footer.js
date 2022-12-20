import React from "react";
import { Box, Stack, Typography, styled } from "@mui/material";

import Navigation from "./Navigation";

const InstagramBox = styled(Box)({
  position: "absolute",
  zIndex: 2,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  backgroundColor: "#fff",
  width: "40%",
  padding: "10px",
  border: "2px solid #333",
});

export default function Footer() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        padding: (theme) => theme.spacing(5, 5, 3, 5),
        position: "relative",
        marginTop: "50px",
      }}
    >
      <Navigation theme="light" />
      <Typography variant="subtitle1" color="#fff" mt={3}>
        Copyright 2022 HL.Store. All Right Reserved
      </Typography>
      <InstagramBox>
        <Typography
          style={{ display: "inline-block" }}
          variant="subtitle1"
          color="secondary"
        >
          Follow Our Instagram:
        </Typography>
        <Typography
          style={{ display: "inline-block", marginLeft: "20px" }}
          variant="subtitle1"
          fontWeight="bold"
        >
          @thinhlee.2509
        </Typography>
      </InstagramBox>
    </Stack>
  );
}
