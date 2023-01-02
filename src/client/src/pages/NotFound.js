import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <Box
      sx={{ height: "60vh", textAlign: "center", textTransform: "uppercase" }}
    >
      <Typography variant="h2">404. Page Not Found</Typography>
      <Typography variant="subtitle1">
        Cannot find page you are looking for. Please turning back
      </Typography>
    </Box>
  );
}
