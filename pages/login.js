import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSession, signIn, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Layout from "../components/Layout";
import LoadingBox from "../components/homePage/LoadingBox";
const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const refreshLoading = useRef();
  const refreshError = useRef();

  // form validation rules
  const validationSchema = Yup.object().shape({
    account: Yup.string()
      .required("Account is required")
      .min(5, "Min-length 5, please re-enter")
      .trim("Account invalid")
      .matches(/^\S*$/, "Account invalid")
      .strict(true),
    password: Yup.string()
      .required("Password is required")
      .trim("Password invalid")
      .matches(/^\S*$/, "Password invalid")
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
    return () => {
      clearTimeout(refreshLoading.current);
      clearTimeout(refreshError.current);
    };
  }, []);
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const onSubmit = async (data) => {
    if (status !== "authenticated") {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        const result = await signIn("login", {
          account: data.account,
          password: data.password,
          redirect: false,
          callbackUrl: "/",
        });
        console.log(result);

        if (!result.error) {
          console.log(session);
          setIsSuccess(true);
          setIsError(false);
          refreshLoading.current = setTimeout(() => {
            setIsLoading(false);
            reset({ account: "", password: "" });
          }, 1000);
        } else {
          setMessageError(result.error);
          setIsError(true);
          setIsLoading(false);
          refreshError.current = setTimeout(() => {
            setIsError(false);
            setMessageError("");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const LoginTitle = styled(Typography)({
    color: "#f4604c",
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: "3.5rem",
  });
  const SignupLink = styled(Link)({
    color: "#54d9b6",
    textDecoration: "revert",
  });
  const LabelInput = styled(Typography)({
    fontWeight: "500",
    opacity: "0.7",
  });
  const InputLogin = styled(TextField)({
    height: "45px",
  });
  const ButtonLogin = styled(Button)({
    backgroundColor: "#0a8080",
    color: "#fff",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#0a8080",
      opacity: 0.8,
    },
  });
  const ButtonLoginSocial = styled(Button)({
    color: "#fff",
    textTransform: "none",
    border: "2px solid",
    color: "#0a8080",
    backgroundColor: "#fff",

    "&:hover": {
      backgroundColor: "#fff",
      opacity: 0.8,
    },
  });
  const ErrorPassWord = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.3rem",
    lineHeight: 1.66,
    textAlign: "left",
    margin: "4px 14px 0 14px",
    color: "#f44336",
  });
  return (
    <>
      <NextSeo
        title="Đăng nhập tài khoản - LeThinh Blog"
        description="Đăng nhập tài khoản thành viên vào website LeThinh Blog"
        openGraph={{
          type: "website",
          locale: "vi_VN",
          url: `${process.env.NEXTAUTH_URL}/login`,
          images: [
            {
              url: "https://i.imgur.com/LW82HKR.png",
              width: 700,
              height: 700,
              alt: "Đăng nhập tài khoản - LeThinh Blog",
            },
          ],
        }}
        twitter={{
          handle: "Thinh Le",
          site: `${process.env.NEXTAUTH_URL}/login`,
          cardType: "summary_large_image",
        }}
      />
      {status !== "authenticated" && (
        <>
          <Layout>
            <LoadingBox isSuccess={isSuccess} isLoading={isLoading} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "background.default",
                justifyContent: "space-around",
                color: "text.primary",
                gap: "10px",
                padding: { xs: "0 10px", md: "0 20px" },
              }}
            >
              <Box
                sx={{
                  maxWidth: "450px",
                  width: "100%",
                  height: "400px",
                  display: { xs: "none", md: "block" },
                  position: "relative",
                }}
              >
                <Image src="https://i.imgur.com/25eZxv6.png" priority={true} layout="fill" alt="Đăng nhập - LT Blog" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  bgcolor: "background.default",
                  justifyContent: "center",
                  color: "text.primary",
                  gap: "10px",
                  padding: "40px 0",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <LoginTitle>LeThinh Blog</LoginTitle>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "3rem",
                    }}
                  >
                    Welcome back to LT Blog
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "1.8rem",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                    component="div"
                  >
                    No account?
                    <Typography
                      sx={{
                        color: "#54d9b6",
                        textDecoration: "revert",
                        fontWeight: "bold",
                      }}
                    >
                      <Link href="/signup">Create account</Link>
                    </Typography>
                  </Typography>
                  {isError && (
                    <Fade in={isError}>
                      <Alert
                        sx={{
                          maxWidth: "400px",
                          width: "100%",
                        }}
                        severity="error"
                      >
                        <AlertTitle>Error</AlertTitle>
                        {messageError} — <strong>try again!</strong>
                      </Alert>
                    </Fade>
                  )}
                </Box>

                <form
                  style={{
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
                    <LabelInput>Account</LabelInput>
                    <Controller
                      name="account"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          fullWidth
                          error={errors.account ? true : false}
                          helperText={errors.account ? errors.account.message : ""}
                          {...field}
                        />
                      )}
                      defaultValue=""
                    />
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
                    >
                      <LabelInput>Password</LabelInput>
                      <LabelInput
                        sx={{
                          color: "#54d9b6",
                          opacity: "1",
                          fontWeight: "bold",
                        }}
                      >
                        For got your Password
                      </LabelInput>
                    </Box>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <OutlinedInput
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          type={showPassword ? "text" : "password"}
                          size="small"
                          fullWidth
                          error={errors.password ? true : false}
                          helperText={errors.password ? errors.password.message : ""}
                          {...field}
                        />
                      )}
                      defaultValue=""
                    />
                    <ErrorPassWord>{errors.password ? errors.password.message : ""}</ErrorPassWord>
                  </FormControl>
                  <ButtonLogin type="submit" onClick={handleSubmit(onSubmit)} variant="contained">
                    Sign in
                  </ButtonLogin>
                </form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <LabelInput
                    sx={{
                      alignSelf: "center",
                    }}
                  >
                    or sign in with
                  </LabelInput>

                  <ButtonLoginSocial onClick={() => signIn("google")} variant="contained">
                    <FcGoogle /> Google
                  </ButtonLoginSocial>
                </Box>
              </Box>
            </Box>
          </Layout>
        </>
      )}
    </>
  );
};

export default Login;
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
