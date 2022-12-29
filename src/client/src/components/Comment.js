import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  Rating,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import React, { useState } from "react";
import { postComment } from "../api";
import useAJAX from "../hooks/useAJAX";
import useAuth from "../hooks/useAuth";

import formatDate from "../utils/dateFormat";
import average from "../utils/average";
import { useDispatch } from "react-redux";
import { appActions } from "../redux/slices/appSlice";

export default function Comment({ productId, comments, onPostNewComment }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, loading, postCommentHandler] = useAJAX(postComment);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const openLoginForm = () => {
    dispatch(appActions.showAuthModal());
  };

  const handlePostComment = async () => {
    const { data } = await postCommentHandler({
      rating,
      comment,
      product: productId,
    });
    setComment("");
    onPostNewComment(data.data);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3">
          {comments?.length} Comments{" "}
          {average(comments?.map((el) => +el.rating))}
          /5
        </Typography>
      </Grid>
      {user && (
        <Grid item xs={12}>
          <Typography fontWeight="bold">{user.name}</Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            size="small"
          />
          <TextField
            fullWidth
            label="Comment"
            multiline
            maxRows={3}
            sx={{ my: 1 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box>
            <LoadingButton
              variant="contained"
              sx={{ ml: "auto", display: "block", px: 3 }}
              onClick={handlePostComment}
              loading={loading}
            >
              POST
            </LoadingButton>
          </Box>
        </Grid>
      )}
      {!user && (
        <Grid item xs={12}>
          <Link
            component="button"
            variant="subtitle1"
            sx={{
              my: 1,
              color: (theme) => theme.palette.info.main,
              textAlign: "center",
              width: "100%",
            }}
            onClick={openLoginForm}
          >
            Login to post comments on this product
          </Link>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {comments?.map((cm) => (
            <Grid item xs={6} key={cm._id}>
              <Card sx={{ p: 1 }}>
                <Typography fontWeight="bold">{cm.userName}</Typography>
                <Box>
                  <Rating value={cm.rating} size="small" readOnly />
                </Box>
                <Typography variant="p">{cm.comment}</Typography>
                {cm.createdAt && (
                  <Typography color="#aaa">
                    {formatDate(cm.createdAt)}
                  </Typography>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
