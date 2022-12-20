import React from "react";

import { Controller, useFormContext } from "react-hook-form";

//Mui
import { TextField, styled } from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[700],
    padding: 2,
  },

  "& input": {
    padding: theme.spacing(1, 1),
  },
  "& label": {
    top: -8,
    left: -6,
    "&.Mui-focused, &.MuiFormLabel-filled": {
      top: -2,
    },
  },
  "& MuiSvgIcon-root": {
    fill: theme.palette.primary.main,
  },
}));

export default function RHFDatePicker({ name, label, ...other }) {
  const { control } = useFormContext();
  const [value, setValue] = React.useState("");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label={label || "Date"}
            value={value}
            inputFormat="dd/MM/yyyy"
            views={["year", "month", "day"]}
            onChange={(newValue) => {
              field.onChange(newValue);
              setValue(newValue);
            }}
            renderInput={(props) => (
              <StyledTextField
                {...props}
                color="primary"
                sx={{
                  svg: (theme) => ({ color: theme.palette.primary.main }),
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
