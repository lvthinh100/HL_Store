import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <Grid container spacing={3}>
      {products?.map((pro) => (
        <Grid item xs={3} key={pro._id}>
          <ProductCard
            name={pro.name}
            price={pro.price}
            image={pro.image}
            id={pro._id}
          />
        </Grid>
      ))}
    </Grid>
  );
}
