import React from "react";
import { ButtonGroup, Stack, IconButton, Typography } from "@mui/material";

export default function Counter() {
  return (
    <ButtonGroup
      component={Stack}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ border: "1px solid #333", width: "80px" }}
    >
      <IconButton sx={{ width: "30px", height: "30px" }}>-</IconButton>
      <Typography>12</Typography>
      <IconButton sx={{ width: "30px", height: "30px" }}>+</IconButton>
    </ButtonGroup>
  );
}
