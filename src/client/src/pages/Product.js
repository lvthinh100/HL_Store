import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  Rating,
  Stack,
  RadioGroup,
  Radio,
  styled,
  Button,
  Box,
} from "@mui/material";

import { useState } from "react";

import Counter from "../components/Counter";
import Comment from "../components/Comment";

import { getProductDetail } from "../api";
import { SERVER_URL } from "../config";
import { defaultEqualityCheck } from "reselect";

const FieldHeader = styled(Typography)({
  fontWeight: "Bold",
  fontSize: "20px",
  margin: "10px 0",
});

const SizeRadio = function ({ label, ...other }) {
  return (
    <Radio
      {...other}
      disableRipple
      sx={{ backgroundColor: "transparent", padding: 0, mr: 2 }}
      icon={<Button variant="outlined">{label}</Button>}
      checkedIcon={<Button variant="contained">{label}</Button>}
    />
  );
};

export default function Product() {
  const { id } = useParams();
  const [size, setSize] = useState(0);
  const [detail, setDetail] = useState({});

  const postCommentHandler = function (newComment) {
    setDetail({
      ...detail,
      comments: [...detail.comments, newComment],
    });
  };

  useEffect(() => {
    const getDetail = async () => {
      const { data } = await getProductDetail(id);
      setDetail(data.data);
      console.log(data.data);
    };
    getDetail();
  }, [id]);

  return (
    <Container sx={{ my: 10 }}>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <img
            src={
              detail.image
                ? `${SERVER_URL.PRODUCT_IMAGE}/${detail.image}`
                : `${SERVER_URL.IMAGE}/model.jpg`
            }
            alt={detail.image}
            width="100%"
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h3">{detail.name}</Typography>
          {/* <Typography variant="h3">{id}</Typography> */}
          <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
            <Rating name="read-only" value={3} readOnly />
            <Typography variant="subtitle1" sx={{ mx: 1 }}>
              (11 rating)
            </Typography>
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold" fontSize="20px">
            {detail.price?.toLocaleString()}
          </Typography>
          <FieldHeader variant="subtitle1">Size:</FieldHeader>
          <RadioGroup
            row
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {/* <SizeRadio value={0} label="S" />
            <SizeRadio value={1} label="M" />
            <SizeRadio value={2} label="L" />
            <SizeRadio value={3} label="XL" /> */}
            {detail.size?.map((s, index) => (
              <SizeRadio key={s.name} value={index} label={s.name} />
            ))}
          </RadioGroup>
          <Typography variant="subtitle" fontWeight="light">
            In Stock: {detail.size ? detail.size[size].quantity : 0}
          </Typography>
          <FieldHeader variant="subtitle1">Quantity:</FieldHeader>
          <Counter />
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              sx={{ p: "10px 50px", textTransform: "uppercase" }}
            >
              Add to cart
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">Description</Typography>
          <Typography variant="p" fontSize="20px">
            {detail.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Comment
            productId={detail._id}
            comments={detail.comments ? detail.comments : []}
            onPostNewComment={postCommentHandler}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
