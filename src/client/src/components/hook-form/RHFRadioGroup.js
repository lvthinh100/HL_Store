import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//Mui
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  styled,
  FormLabel,
} from "@mui/material";

const StyledRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: "1.2rem",
  },
  "&.Mui-checked~.MuiTypography-root": {
    fontWeight: "bold",
  },
}));

const StyledInput = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    width: "100%",
    padding: "5px 10px",
    margin: "5px 0",
    borderRadius: theme.shape.borderRadius + "px",
    border: `${checked ? 3 : 1}px solid`,
    borderColor: ` ${
      checked ? theme.palette.highlighter.main : theme.palette.highlighter.main
    }`,
  })
);

export default function RHFRadioGroup({
  name,
  label,
  options,
  getOptionLabel,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormLabel>{label}</FormLabel>
          {error && (
            <Typography sx={{ color: (theme) => theme.palette.error.main }}>
              {error?.message}
            </Typography>
          )}
          <RadioGroup {...field} {...other}>
            {options.map((option, index) => (
              <StyledInput
                key={option.value}
                value={option.value}
                checked={field.value === option.value}
                control={
                  <StyledRadio
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: (theme) => theme.palette.highlighter.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "1.2rem" }}>
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </div>
      )}
    />
  );
}
