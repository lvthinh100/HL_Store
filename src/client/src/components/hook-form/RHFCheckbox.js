import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//Mui
import { Checkbox, FormControlLabel, styled, Typography } from "@mui/material";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  paddingRight: 1,
  "& .MuiSvgIcon-root": { fontSize: "1rem" },
  "&.Mui-checked~.MuiTypography-root": { color: theme.palette.secondary.main },
}));

export default function RHFCheckbox({ name, label, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          control={<StyledCheckbox color="secondary" {...field} {...other} />}
          label={<Typography sx={{ fontSize: "0.9rem" }}>{label}</Typography>}
        />
      )}
    />
  );
}
