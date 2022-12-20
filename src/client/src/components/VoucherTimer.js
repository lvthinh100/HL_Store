import React from "react";
import { Stack, Paper, Typography } from "@mui/material";

const TimerElement = function ({ value, label }) {
  return (
    <Paper
      sx={{ width: "100px", height: "100px", marginRight: "20px" }}
      variant="outlined"
    >
      <Stack height="100%" alignItems={"center"} justifyContent="center">
        <Typography fontWeight="bold" fontSize="42px" lineHeight="42px">
          {value}
        </Typography>
        <Typography textTransform="uppercase">{label}</Typography>
      </Stack>
    </Paper>
  );
};

export default function VoucherTimer(props) {
  return (
    <Stack direction={"row"} {...props}>
      <TimerElement value={8} label="DAYS" />
      <TimerElement value={8} label="HOURS" />
      <TimerElement value={8} label="MINUTEs" />
    </Stack>
  );
}
