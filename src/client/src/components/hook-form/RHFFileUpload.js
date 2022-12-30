import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//Mui
import { Button } from "@mui/material";

export default function RHFFileUpload({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Button
          variant="contained"
          component="label"
          sx={{ my: 1 }}
          color={error ? "error" : "primary"}
        >
          Product Image
          <input
            hidden
            accept="image/*"
            type="file"
            {...field}
            {...other}
            value={field.value.filename}
            onChange={(event) => {
              return field.onChange(event.target.files);
            }}
          />
        </Button>
      )}
    />
  );
}
