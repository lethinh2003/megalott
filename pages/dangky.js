import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Layout from "../components/Layout";
import LoadingBox from "../components/homePage/LoadingBox";
import { inputStyles, rootInputStyles, rootStyles } from "../custom/textfield";
const DangKy = () => {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    account: Yup.string()
      .required("Vui lòng nhập tài khoản")
      .min(6, "Tài khoản phải từ 6 kí tự trở lên")
      .trim("Tài khoản không hợp lế")
      .matches(/^\S*$/, "Tài khoản không hợp lệ")
      .strict(true),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải từ 6 kí tự trở lên")
      .trim("Mật khẩu không hợp lệ")
      .matches(/^\S*$/, "Mật khẩu không hợp lệ")
      .strict(true),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập nhập lại mật khẩu")
      .min(6, "Nhập lại mật khẩu phải từ 6 kí tự trở lên")
      .trim("Nhập lại mật khẩu không hợp lệ")
      .matches(/^\S*$/, "Nhập lại mật khẩu không hợp lệ")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp với nhau")
      .strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm(formOptions);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const onSubmit = async (data) => {
    if (status !== "authenticated") {
      try {
        setIsLoading(true);
        const result = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/nguoidung/sign-up`, {
          taiKhoan: data.account,
          matKhau: data.password,
          nhapLaiMatKhau: data.confirmPassword,
        });
        if (result && result.data) {
          toast.success(result.data.message);
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  const ButtonLogin = styled(Button)({
    backgroundColor: "#0a8080",
    color: "#fff",
    textTransform: "none",
    fontSize: "2rem",

    "&:hover": {
      backgroundColor: "#0a8080",
      opacity: 0.8,
    },
  });

  const ErrorMessage = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.7rem",
    textAlign: "center",
    lineHeight: 1.66,

    color: "#f44336",
  });
  return (
    <>
      {status !== "authenticated" && (
        <>
          <LoadingBox isSuccess={isSuccess} isLoading={isLoading} />
          <Layout>
            <Typography component={"h1"} className="title-h1">
              Đăng ký
            </Typography>

            <form
              style={{
                paddingTop: "5rem",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "15px",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                variant="standard"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Controller
                  name="account"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      placeholder="Tài khoản"
                      size="small"
                      fullWidth
                      error={errors.account ? true : false}
                      sx={{
                        ...rootStyles,
                      }}
                      InputProps={{
                        sx: {
                          ...rootInputStyles,
                        },
                      }}
                      inputProps={{
                        sx: {
                          ...inputStyles,
                        },
                      }}
                      {...field}
                    />
                  )}
                  defaultValue=""
                />
                <ErrorMessage>{errors.account ? errors.account.message : ""}</ErrorMessage>
              </FormControl>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                ></Box>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      placeholder="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      size="small"
                      fullWidth
                      error={errors.password ? true : false}
                      sx={{
                        ...rootStyles,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          ...rootInputStyles,
                        },
                      }}
                      inputProps={{
                        sx: {
                          ...inputStyles,
                        },
                      }}
                      {...field}
                    />
                  )}
                  defaultValue=""
                />
                <ErrorMessage>{errors.password ? errors.password.message : ""}</ErrorMessage>
              </FormControl>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                ></Box>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      placeholder="Nhập lại mật khẩu"
                      type={showConfirmPassword ? "text" : "password"}
                      size="small"
                      fullWidth
                      error={errors.password ? true : false}
                      sx={{
                        ...rootStyles,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          ...rootInputStyles,
                        },
                      }}
                      inputProps={{
                        sx: {
                          ...inputStyles,
                        },
                      }}
                      {...field}
                    />
                  )}
                  defaultValue=""
                />
                <ErrorMessage>{errors.confirmPassword ? errors.confirmPassword.message : ""}</ErrorMessage>
              </FormControl>
              <ButtonLogin type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
                Đăng ký
              </ButtonLogin>
            </form>
          </Layout>
        </>
      )}
    </>
  );
};

export default DangKy;
export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
