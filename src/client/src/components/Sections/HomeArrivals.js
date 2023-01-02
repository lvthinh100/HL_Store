import React from "react";

import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { StyledArrBox, StyledArrPaper } from "../../pages/HomeStyle";

export default function HomeArrivals() {
  return (
    <Grid container spacing={12}>
      <Grid item xs={4}>
        <StyledArrBox
          component={Link}
          sx={{ display: "block" }}
          to="/collection/casual"
        >
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
              Casual
            </Typography>
          </StyledArrPaper>
        </StyledArrBox>
      </Grid>
      <Grid item xs={4}>
        <StyledArrBox
          component={Link}
          sx={{ display: "block" }}
          to="/collection/winter"
        >
          <img
            style={{
              width: "100%",
              transition: "0.5s all ease-in-out",
            }}
            src="http://localhost:3000/img/winter.jpg"
            alt="Sweater"
          />
          <StyledArrPaper>
            <Typography
              textTransform="uppercase"
              textAlign="center"
              lineHeight={"60px"}
              fontSize="1.8rem"
            >
              Winter
            </Typography>
          </StyledArrPaper>
        </StyledArrBox>
      </Grid>
      <Grid item xs={4}>
        <StyledArrBox
          component={Link}
          sx={{ display: "block" }}
          to="/collection/coat"
        >
          <img
            style={{
              width: "100%",
              transition: "0.5s all ease-in-out",
            }}
            src="http://localhost:3000/img/coat.jpg"
            alt="Sweater"
          />
          <StyledArrPaper>
            <Typography
              textTransform="uppercase"
              textAlign="center"
              lineHeight={"60px"}
              fontSize="1.8rem"
            >
              Coat
            </Typography>
          </StyledArrPaper>
        </StyledArrBox>
      </Grid>
    </Grid>
  );
}
