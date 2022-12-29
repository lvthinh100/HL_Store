import React from "react";
import { Link } from "react-router-dom";

import { Button, Grid, Typography, Box, Stack, Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { StyledArrBox, StyledArrPaper, StyledButton } from "./HomeStyle";
import ProductCard from "../components/ProductCard";
import VoucherTimer from "../components/VoucherTimer";
import HomeTab from "../components/Sections/HomeTab";

const Headline = function ({ children, subtitle, title, theme }) {
  const color = theme === "light" ? "#fff" : "inherit";
  return (
    <Stack direction="column" height="100%" justifyContent="center">
      <Typography variant="h1" whiteSpace="pre-line" color={color}>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        marginTop="30px"
        fontSize="22px"
        color={color}
      >
        {subtitle}
      </Typography>
      {children}
    </Stack>
  );
};

export default function Home() {
  return (
    <Box>
      <Container>
        <Grid container margin="40px 0">
          <Grid container>
            <Grid item xs={6}>
              <Headline
                title={`Winter 
                Collection 
                Style For You`}
                subtitle="Welcome to HL.Store, your shopping destination \n for
                  fashion online. We offer fashion and quality \n at the
                  best price in a more sustainable way"
              >
                <Box>
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    to="/products"
                    sx={{
                      boxShadow: 10,
                      padding: "15px 40px",
                      fontSize: 18,
                      marginTop: 2,
                    }}
                  >
                    SHOP NOW
                  </Button>
                </Box>
              </Headline>
            </Grid>
            <Grid item xs={6}>
              <Box width={"55%"} margin="0 auto">
                <img
                  style={{ width: "100%", borderRadius: "0 0 0 80px" }}
                  src="http://localhost:3000/img/model.jpg"
                  alt="model"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container margin="40px 0">
            <Grid item xs={12} margin="30px 0">
              <Stack direction="column" alignItems="center" margin="0 auto">
                <Typography variant="h2">New Arrivals</Typography>
                <Typography variant="subtitle1">
                  Winter collection help you go through Cold Winter
                </Typography>
              </Stack>
            </Grid>
            <Grid container spacing={12}>
              {[0, 1, 2].map((el, i) => (
                <Grid item xs={4} key={i}>
                  <StyledArrBox>
                    <img
                      style={{
                        width: "100%",
                        transition: "0.5s all ease-in-out",
                      }}
                      src="http://localhost:3000/img/model.jpg"
                      alt="Sweater"
                    />
                    <StyledArrPaper>
                      <Typography
                        textTransform="uppercase"
                        textAlign="center"
                        lineHeight={"60px"}
                        fontSize="1.8rem"
                      >
                        Sweater
                      </Typography>
                    </StyledArrPaper>
                  </StyledArrBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid container margin="40px 0" spacing={5}>
            <Grid item xs={7}>
              <Box width="100%">
                <img
                  style={{ width: "100%", borderRadius: "120px 0 0 0" }}
                  src="http://localhost:3000/img/onlyforys.jpg"
                  alt="onlyForYourself"
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Headline
                title={"Only For \n Yourself"}
                subtitle={
                  "A good man is one who takes care of himself. Because men also have the right to receive gifts, and if you do not have a GIFT, then confidently buy yourself a HL.STORE box."
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* Best Seller */}
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          padding: (theme) => theme.spacing(5, 0),
          position: "relative",
          marginTop: "50px",
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Box>
                <Headline
                  title={`Best Seller
                Product`}
                  subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper congue eros"
                  theme={"light"}
                >
                  <Box>
                    <StyledButton variant="outlined" color="lighter">
                      See More
                    </StyledButton>
                  </Box>
                </Headline>
              </Box>
            </Grid>
            <Grid item xs={8}>
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
                {[0, 1, 2, 3, 4].map((el) => (
                  <Grid container key={el} spacing={2}>
                    <Grid item xs={6}>
                      <ProductCard title={el} />
                    </Grid>

                    <Grid item xs={6}>
                      <ProductCard title={el} />
                    </Grid>
                  </Grid>
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <HomeTab />

      <Box>
        <StyledButton
          sx={{ display: "block", margin: "10px auto" }}
          variant="contained"
        >
          SEE MORE
        </StyledButton>
      </Box>

      {/* Voucher out now */}
      <Container>
        <Grid
          sx={{
            backgroundColor: (theme) => theme.palette.highlighter.main,
            padding: "40px 20px",
            marginTop: "50px",
          }}
          container
        >
          <Grid item xs={6}>
            <Headline
              title={"Voucher Out Now"}
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper congue erosget tincidunt "
            >
              <VoucherTimer sx={{ marginTop: "20px" }} />
              <Box sx={{ marginTop: "20px" }}>
                <StyledButton variant="contained">GET NOW</StyledButton>
              </Box>
            </Headline>
          </Grid>
          <Grid item xs={6}>
            <img
              style={{ width: "100%" }}
              src="http://localhost:3000/img/voucher.jpg"
              alt="Voucher out now"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
