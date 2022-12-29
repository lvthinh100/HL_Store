import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import ProductList from "../components/ProductList";

import { getAllProducts } from "../api";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products.data.data);
    };
    getProducts();
  }, []);
  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        HL.Store's Products
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
