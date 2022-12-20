import React from "react";
//yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//hook-form
import { useForm } from "react-hook-form";
//mui
import { Alert, Box, Divider, InputAdornment, Typography } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";
//
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import { TabLink as Link } from "./style";
// import RHFCheckbox from "../../hook-form/RHFCheckbox";

//Redux
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { appActions } from "../../redux/slices/appSlice";
import useAJAX from "../../hooks/useAJAX";

//API
import { login } from "../../api";

export default function LoginForm({ onChangeTab }) {
  const [error, loading, loginHandler] = useAJAX(login);
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
  });
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const submitLoginForm = async (data) => {
    const response = await loginHandler(data.email, data.password);
    console.log(response);
    if (response.data.status === "success") {
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: `Login successfully with email: ${data.email}`,
        })
      );
      dispatch(
        authActions.setUser({
          user: response.data.data.user,
          tokenExpires: response.data.tokenExpires,
          token: response.data.token,
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitLoginForm)}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        textAlign={"center"}
      >
        Log in
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
      >
        Đăng Nhập
      </LoadingButton>
      <Box sx={{ m: 2, textAlign: "center" }}>
        <Divider sx={{ margin: 0 }} variant="middle" />
        <Link onClick={onChangeTab}>Đăng Ký</Link>
      </Box>
    </FormProvider>
  );
}
