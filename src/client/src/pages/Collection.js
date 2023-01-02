import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

import { searchCollection } from "../api";
import ProductList from "../components/ProductList";

export default function Collection() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCollection = async () => {
      const { data } = await searchCollection(category);
      if (data.data.length === 0) return navigate("/error");
      setProducts(data.data);
    };
    fetchCollection();
  }, [category, navigate]);

  return (
    <Container>
      <Typography textAlign="center" variant="h2" sx={{ my: 2 }}>
        {category.toUpperCase()}'s Fashion
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
