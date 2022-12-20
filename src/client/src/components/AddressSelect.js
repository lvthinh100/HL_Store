import React from "react";

import RHFSelect from "./hook-form/RHFSelect";
import { MenuItem, Select } from "@mui/material";
export default function AddressSelect() {
  return <RHFSelect name="address1" label="Tỉnh" options={["1", "2", "3"]} />;
}
