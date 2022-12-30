import React from "react";

import { Button, Grid, Typography, Box } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FormProvider from "../hook-form/FormProvider";
import RHFTextField from "../hook-form/RHFTextField";
import RHFNumberField from "../hook-form/RHFNumberField";

import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../api";
import RHFMultiSelect from "../hook-form/RHFMultiSelect";
import RHFFileUpload from "../hook-form/RHFFileUpload";

const category = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kid", value: "kid" },
  { label: "Coat", value: "coat" },
  { label: "Winter", value: "winter" },
  { label: "Underwear", value: "underwear" },
  { label: "Casual", value: "casual" },
  { label: "Sport", value: "sport" },
];

export default function AddProductForm({ onCancel }) {
  const schema = yup.object().shape({
    name: yup.string().required("Please insert name"),
    description: yup.string().required("Please insert description"),
    price: yup
      .number("Please insert valid price type of number")
      .required("Please insert Price"),
    sizeS: yup.number("Please insert valid price type of number"),
    sizeM: yup.number("Please insert valid price type of number"),
    sizeL: yup.number("Please insert valid price type of number"),
    sizeXL: yup.number("Please insert valid price type of number"),
    category: yup
      .array()
      .min(1, "You can't leave this blank.")
      .required("You can't leave this blank."),
    image: yup
      .mixed()
      .test("required", "You need to provide a file", (file) => {
        if (file) return true;
        return false;
      }),
  });

  const defaultValues = {
    name: "",
    description: "",
    price: 1000,
    sizeS: 10,
    sizeM: 10,
    sizeL: 10,
    sizeXL: 10,
    category: [],
    image: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmitForm = async (data) => {
    const {
      price,
      description,
      name,
      sizeS: S,
      sizeL: L,
      sizeM: M,
      sizeXL: XL,
      category,
    } = data;
    const entries = {
      name,
      quantity: S + M + L + XL,
      category,
      price,
      description,
      size: [
        {
          name: "S",
          quantity: S,
        },
        {
          name: "M",
          quantity: M,
        },
        {
          name: "L",
          quantity: L,
        },
        {
          name: "XL",
          quantity: XL,
        },
      ],
    };
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const { data: newProd1 } = await createProduct(entries);
    const { id } = newProd1.data;
    // const newProd2 = await updateProduct(id, formData);
    // console.log(data.image[0]);
    await updateProduct(id, formData);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitForm)}>
      <RHFTextField name="name" label="Name" />
      <RHFNumberField name="price" label="Price" />
      <RHFTextField name="description" label="Description" />
      <Typography>Quantity: </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <RHFNumberField name="sizeS" label="S" />
        </Grid>
        <Grid item xs={3}>
          <RHFNumberField name="sizeM" label="M" />
        </Grid>
        <Grid item xs={3}>
          <RHFNumberField name="sizeL" label="L" />
        </Grid>
        <Grid item xs={3}>
          <RHFNumberField name="sizeXL" label="XL" />
        </Grid>
      </Grid>
      <RHFMultiSelect name="category" label="Category" options={category} />
      <Box>
        {/* <Button variant="contained" component="label" sx={{ my: 1 }}>
          Product Image
          <input
            hidden
            name="image"
            accept="image/*"
            type="file"
            required
            {...register("file")}
          />
        </Button> */}
        <RHFFileUpload name="image" />
      </Box>
      <Button type="submit" variant="contained" sx={{ mr: 1 }}>
        ADD
      </Button>
      <Button type="submit" variant="outlined" onClick={onCancel}>
        CANCEL
      </Button>
    </FormProvider>
  );
}
