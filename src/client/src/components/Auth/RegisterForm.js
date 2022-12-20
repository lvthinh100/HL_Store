import React from "react";
//yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//hook-form
import { useForm } from "react-hook-form";
//mui
import { Alert, Box, Divider, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LockIcon from "@mui/icons-material/Lock";
//component
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import { TabLink as Link } from "./style";

// import RHFCheckbox from "../../hook-form/RHFCheckbox";

//Redux
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/slices/appSlice";
import { authActions } from "../../redux/slices/authSlice";

//API
import { signup } from "../../api";
import useAJAX from "../../hooks/useAJAX";

import { REGEX } from "../../config";

export default function LoginForm({ onChangeTab }) {
  const [error, loading, signupHandler] = useAJAX(signup);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Vui lòng nhập email hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải ít nhất 8 ký tự")
      .required("Vui long nhap mật khẩu"),
    name: yup.string().required("Please input name"),
    address: yup.string().max(100, "Dia chi qua dai"),
    phone: yup.string().matches(REGEX.PHONE, "Phone number is not valid"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([yup.ref("password")], "Xác nhận mật khẩu không hợp lệ"),
  });
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    address: "",
    phone: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmitRegisterForm = async (data) => {
    const response = await signupHandler(data);
    if (response.data.status === "success") {
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: `account create successfully with email: ${data.email}`,
        })
      );
      dispatch(authActions.setUser(response.data.data.user));
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmitRegisterForm)}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        textAlign={"center"}
      >
        Sign up
      </Typography>
      <RHFTextField
        name="email"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSharpIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />

      <RHFTextField
        name="name"
        label="Tên người dùng"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />

      <RHFTextField
        name="password"
        label="Mật khẩu"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Xác nhận Mật khẩu"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />
      <RHFTextField
        name="phone"
        label="Số điện thoại"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />
      <RHFTextField
        name="address"
        label="Địa chỉ"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          autoComplete: "off",
        }}
      />

      {error && (
        <Alert variant="outlined" severity="error" color="">
          {error}
        </Alert>
      )}
      {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RHFCheckbox name="remember" label="Ghi nhớ" />
        <Link href="#" sx={{ fontSize: "0.9rem" }}>
          Quên mật khẩu
        </Link>
      </Stack> */}
      <LoadingButton
        loading={loading}
        fullWidth
        variant="contained"
        type="submit"
        mt={2}
      >
        Đăng Ký
      </LoadingButton>
      <Box sx={{ m: 2, textAlign: "center" }}>
        <Divider sx={{ margin: 0 }} variant="middle" />
        <Link onClick={onChangeTab}>Đăng nhập</Link>
      </Box>
    </FormProvider>
  );
}
