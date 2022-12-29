import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//Mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function RHFMultiSelect({
  name,
  label,
  options,
  getOptionLabel,
  placeholder,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel sx={{ top: 6, fontSize: "1.1rem" }}>{label}</InputLabel>
          <Select
            multiple
            label={label}
            error={!!error}
            inputRef={field.ref}
            MenuProps={{
              style: { maxHeight: 250 },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
            }}
            {...field}
            {...other}
            sx={{
              position: "relative",
              margin: "5px 0",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            {options?.map((option, index) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  "&:hover": {
                    bgcolor: "#d9d9d9",
                    fontWeight: "bold",
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
            {!options?.length && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
          </Select>
          <FormHelperText
            error={!!error}
            sx={{ m: 0, position: "absolute", top: -12, right: 0 }}
          >
            {error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
