import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid, Container } from "@mui/material";

import { BoxModalStyled } from "../components/Modal/style";
import AddProductForm from "../components/Form/AddProductForm";
import ProductCard from "../components/ProductCard";

import { getAllProducts } from "../api";

export default function ProductsManager() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products.data.data);
      console.log(products);
    };
    getProducts();
  }, []);
  return (
    <Box>
      <Typography variant="h2" textAlign="center">
        Product Manager
      </Typography>
      (
      <Button
        variant="contained"
        sx={{ mx: "auto", display: "block" }}
        onClick={() => setOpen(true)}
      >
        ADD NEW PRODUCT
      </Button>
      )
      <Container sx={{ my: 2 }}>
        <Grid container spacing={2}>
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
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <BoxModalStyled sx={{ p: 3, width: "600px" }}>
          <Typography variant="h4" textAlign="center">
            Add new product
          </Typography>
          <AddProductForm onCancel={() => setOpen(false)} />
        </BoxModalStyled>
      </Modal>
    </Box>
  );
}
