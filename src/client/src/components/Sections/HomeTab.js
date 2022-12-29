import React, { useState, useEffect } from "react";

import { Container, Stack, Tabs, Typography, Tab, Grid } from "@mui/material";
import { TabPanel } from "../Tab";

import { getAllProducts } from "../../api";
import ProductList from "../ProductList";

const productTab = ["winter", "underwear", "casual", "sport"];

export default function HomeTab() {
  const [curTab, setCurTab] = useState(0);
  const [products, setProducts] = useState([]);

  const filterProducts = (category) => {
    return products.filter((prod) => prod.category.includes(category));
  };

  const changeTabHandler = function (event, value) {
    setCurTab(value);
  };
  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products.data.data);
    };
    getProducts();
  }, []);
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Stack direction="column" alignItems="center" margin="0 auto">
        <Typography variant="h2">Our Product</Typography>
        <Tabs value={curTab} onChange={changeTabHandler}>
          <Tab label="Winter" value={0} />
          <Tab label="Underwear" value={1} />
          <Tab label="Casual" value={2} />
          <Tab label="Sport" value={3} />
        </Tabs>
      </Stack>

      {[0, 1, 2, 3].map((el) => (
        <TabPanel value={curTab} index={el} key={el}>
          <ProductList products={filterProducts(productTab[curTab])} />
        </TabPanel>
      ))}
    </Container>
  );
}
