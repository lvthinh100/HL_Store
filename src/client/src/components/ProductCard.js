import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function ProductCard({ title }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        height="300"
        alt="model"
        component="img"
        src="http://localhost:3000/img/model.jpg"
      />
      <CardContent>
        <Typography>{`Long Sleeve Hoodie ${title}`}</Typography>
        <Typography>150.000đ</Typography>
      </CardContent>
    </Card>
  );
}
