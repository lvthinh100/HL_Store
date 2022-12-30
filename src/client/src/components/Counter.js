import React, { useEffect, useState } from "react";
import { ButtonGroup, Stack, IconButton, Typography } from "@mui/material";

export default function Counter({ min, max, onChange, start }) {
  const [counter, setCounter] = useState(start ? start : min);

  const increaseCounter = () => {
    if (counter >= max) return setCounter(max);
    const newValue = counter + 1;
    setCounter(newValue);
    onChange(newValue);
  };
  const decreaseCounter = () => {
    if (counter <= min) return setCounter(min);
    const newValue = counter - 1;
    setCounter(newValue);
    onChange(newValue);
  };
  useEffect(() => {
    if (counter >= max) return setCounter(max);
    if (counter <= min) return setCounter(min);
  }, [min, max, counter]);

  return (
    <ButtonGroup
      component={Stack}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ border: "1px solid #333", width: "80px" }}
    >
      <IconButton
        onClick={decreaseCounter}
        sx={{ width: "30px", height: "30px" }}
      >
        -
      </IconButton>
      <Typography>{counter}</Typography>
      <IconButton
        onClick={increaseCounter}
        sx={{ width: "30px", height: "30px" }}
      >
        +
      </IconButton>
    </ButtonGroup>
  );
}
