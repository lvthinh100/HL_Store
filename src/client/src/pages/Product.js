import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import useAuth from "../hooks/useAuth";
import { appActions } from "../redux/slices/appSlice";
import average from "../utils/average";

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
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postCommentHandler = function (newComment) {
    setDetail({
      ...detail,
      comments: [...detail.comments, newComment],
    });
  };
  const addCartHandler = function () {
    if (!user) return dispatch(appActions.showAuthModal());
    const cartItem = {
      id: detail._id,
      name: detail.name,
      size: detail.size[size].name,
      price: detail.price,
      image: detail.image,
      quantity,
      inStock: detail.size,
    };
    dispatch(cartActions.addItems(cartItem));
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await getProductDetail(id);
        setDetail(data.data);
      } catch (err) {
        navigate("/error");
      }
    };
    getDetail();
  }, [id, navigate]);

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
            <Rating
              name="read-only"
              value={detail.ratingsAverage ? detail.ratingsAverage : 0}
              readOnly
            />
            <Typography variant="subtitle1" sx={{ mx: 1 }}>
              {detail.comments?.length} rating
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
          <Counter
            min={1}
            max={detail.size ? detail.size[size].quantity : 0}
            onChange={(newValue) => setQuantity(newValue)}
          />
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              sx={{ p: "10px 50px", textTransform: "uppercase" }}
              onClick={addCartHandler}
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
