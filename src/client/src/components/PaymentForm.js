import React from "react";
import { forwardRef } from "react";
import { Button, Grid, Typography } from "@mui/material";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import RHFTextField from "./hook-form/RHFTextField";
import RHFSelect from "./hook-form/RHFSelect";
import RHFRadioGroup from "./hook-form/RHFRadioGroup";

import FormProvider from "./hook-form/FormProvider";
import useLocationInfo from "../hooks/useLocationInfo";
import { REGEX } from "../config";

export default function PaymentForm() {
  const { provinces, districts, wards, fetchDistrict, fetchWard } =
    useLocationInfo();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please insert a valid email")
      .required("Please insert email"),
    name: yup.string().required("Please insert name"),
    phone: yup.string().matches(REGEX.PHONE, "Phone number is not valid"),
    address: yup.string().max(100, "Address too long"),
    note: yup.string().max(100, "Note too long"),
    province: yup.string().required("Please Select Province"),
    district: yup.string().required("Please Select District"),
    ward: yup.string().required("Please Select Ward"),
    method: yup.string().required("Please select payment method"),
  });
  const defaultValues = {
    email: "",
    name: "",
    phone: "",
    address: "",
    note: "",
    province: "",
    district: "",
    ward: "",
    method: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, register, setValue, getValues } = methods;
  const onSubmitForm = (data) => {
    const [{ label: province }] = provinces.filter(
      (el) => el.value === data.province
    );
    const [{ label: district }] = districts.filter(
      (el) => +el.value === +data.district
    );
    const fullAdr = `${data.ward}, ${district}, Tỉnh ${province}`;
    console.log(fullAdr);
  };

  const onSelectProvince = (e) => {
    register("province", { required: true }).onChange(e);
    const value = e.target.value;
    // do something with value
    fetchDistrict(value);
    setValue("ward", "");
    setValue("district", "");
  };

  const onSelectDistrict = (e) => {
    register("district", { required: true }).onChange(e);
    const value = e.target.value;
    // do something with value
    const province = getValues("province");
    fetchWard(province, value);
    setValue("ward", "");
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitForm)}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <RHFTextField name="name" label="Name" />
        </Grid>
        <Grid item xs={6}>
          <RHFTextField name="phone" label="Phone number" />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="email" label="Email" />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="address" label="Address" />
        </Grid>

        <Grid item xs={4}>
          <RHFSelect
            label="Province"
            placeholder={"Select Province"}
            name="province"
            onChange={onSelectProvince}
            options={provinces}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFSelect
            label="District"
            placeholder={"Select Province"}
            name="district"
            options={districts}
            onChange={onSelectDistrict}
          />
        </Grid>
        <Grid item xs={4}>
          <RHFSelect
            label="Ward"
            placeholder={"Select District"}
            name="ward"
            options={wards}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="note" label="Note" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Payment Method</Typography>
        </Grid>
        <Grid item xs={12}>
          <RHFRadioGroup
            name="method"
            label=""
            options={[
              { value: "momo", label: "COD: Cash on delivery" },
              { value: "code", label: "Online: Pay with MOMO" },
            ]}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Submit
      </Button>
    </FormProvider>
  );
}
