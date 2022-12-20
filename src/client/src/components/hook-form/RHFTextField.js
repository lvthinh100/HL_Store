import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import { TextField, styled, FormControl, FormHelperText } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1.2, 0),
  position: "relative",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    padding: 2,
  },
  "& input": {
    padding: theme.spacing(0.8, 1),
  },
  "& label": {
    fontSize: "1.1rem",
    top: -10,
    left: -4,
  },
  "& label.MuiInputLabel-shrink ": {
    top: -2,
    left: -6,
  },
}));

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <StyledTextField
              fullWidth
              error={!!error}
              inputProps={{ style: { fontSize: "1.2rem" } }}
              sx={{
                svg: (theme) => ({
                  color: error
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
                }),
              }}
              {...field}
              {...other}
            />
            <FormHelperText
              error={!!error}
              sx={{ m: 0, position: "absolute", top: -12, right: 0 }}
            >
              {error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
