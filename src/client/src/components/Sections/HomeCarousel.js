import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard";
import { getHighRateProducts } from "../../api";

export default function HomeCarousel() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getHighRate = async () => {
      const { data } = await getHighRateProducts();
      setProducts(data.data);
      console.log(data);
    };
    getHighRate();
  }, []);
  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          marginTop: 0,
          textAlign: "left", // 4
        },
      }}
      indicatorIconButtonProps={{
        style: {
          zIndex: 100,
        },
      }}
      autoPlay={false}
    >
      {products.length !== 0 &&
        [0, 1, 2].map((index) => (
          <Grid container key={index} spacing={2}>
            <Grid item xs={6}>
              <ProductCard
                name={products[index * 2].name}
                price={products[index * 2].price}
                image={products[index * 2].image}
                id={products[index * 2].id}
              />
            </Grid>
            <Grid item xs={6}>
              <ProductCard
                name={products[index * 2 + 1].name}
                price={products[index * 2 + 1].price}
                image={products[index * 2 + 1].image}
                id={products[index * 2 + 1].id}
              />
            </Grid>
          </Grid>
        ))}
    </Carousel>
  );
}
