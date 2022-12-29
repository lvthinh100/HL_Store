import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Stack,
  Select,
  MenuItem,
  ButtonGroup,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Counter from "./Counter";

export function CartProductSmall() {
  return (
    <Grid container>
      <Grid item xs={3}>
        <CardMedia
          height="120px"
          width="100%"
          alt="model"
          component="img"
          src="http://localhost:3000/img/model.jpg"
          sx={{ objectFit: "contain" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Box>
          <Typography fontSize={"12px"} fontWeight="bold" whiteSpace="pre-line">
            Modal Ultra Warm men's shirt - warm and breathable to wear
            aaaaaaaaaaaa
          </Typography>
          <Typography fontSize={"12px"} variant="subtitle1">
            XL
          </Typography>
          <Typography fontSize={"12px"} fontWeight="bold">
            250.000đ
          </Typography>
          <Typography fontSize={"12px"} margin="">
            x10
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <CloseIcon fontSize="small" />
      </Grid>
    </Grid>
  );
}

export function CartProductDetail({ product }) {
  return (
    <Card sx={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            height="180px"
            width="100%"
            alt="model"
            component="img"
            src="http://localhost:3000/img/model.jpg"
            sx={{ objectFit: "scale-down" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="column"
            height="100%"
            justifyContent="space-between"
            sx={{ padding: 1 }}
          >
            <Typography fontSize={"14px"} fontWeight="bold" display="block">
              Modal Ultra Warm men's shirt - warm and breathable to wear
            </Typography>
            <Stack>
              <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <Select
                  sx={{
                    width: 40,
                    height: 30,
                    "& .MuiSvgIcon-root": { fontSize: "15px" },
                  }}
                >
                  <MenuItem fontSize="12px">S</MenuItem>
                  <MenuItem fontSize="12px">M</MenuItem>
                  <MenuItem fontSize="12px">L</MenuItem>
                  <MenuItem fontSize="12px">XL</MenuItem>
                </Select>
                <Typography variant="subtitle1" fontWeight="light" ml="10px">
                  (In stock: 10)
                </Typography>
              </Stack>
              <Counter />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack
            direction="column"
            height="100%"
            alignItems="end"
            justifyContent="space-between"
            sx={{ mr: 1 }}
          >
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography>120.000đ</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
