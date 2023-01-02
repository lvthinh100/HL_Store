import React from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { SERVER_URL } from "../config";

export default function ProductCard({ name, price, image, id }) {
  return (
    <Link component={RouterLink} underline="none" to={`/product/${id}`}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          cursor: "pointer",
          textDecoration: "none",
          "&:hover img": {
            transform: "scale(1.2)",
          },
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <CardMedia
            height="300"
            alt="model"
            component="img"
            src={`${SERVER_URL.PRODUCT_IMAGE}/${image}`}
            sx={{
              transition: "0.5s all ease-in-out",
            }}
          />
        </Box>
        <CardContent>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography>{price?.toLocaleString()}đ</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
