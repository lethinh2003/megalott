import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { OptionMenu, OptionMenuItem } from "../../custom/optionMenu";
import { inputStyles, rootInputStyles, rootStyles } from "../../custom/textfield";
import { listBank } from "../../utils/listBank";
import LoadingBox from "../homePage/LoadingBox";
const ThemNganHang = () => {
  const [isLoading, setIsLoading] = useState(false);
  // form validation rules
  const validationSchema = Yup.object().shape({
    chuTaiKhoan: Yup.string()
      .required("Vui lòng nhập tên chủ tài khoản")
      .trim("Chủ tài khoản không hợp lệ")

      .strict(true),
    soTaiKhoan: Yup.string()
      .required("Vui lòng nhập số tài khoản")
      .trim("Số tài khoản không hợp lệ")

      .strict(true),
    tenNganHang: Yup.string().required("Vui lòng chọn ngân hàng"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      // check ngân hàng hợp lệ
      const nganHangID = data.tenNganHang;
      const checkNganHangID = listBank.find((item) => item.bin === nganHangID);

      if (!checkNganHangID) {
        toast.error("Ngân hàng không hợp lệ");
        return;
      }

      setIsLoading(true);
      const result = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/lienketnganhang/them-moi`, {
        tenNganHang: checkNganHangID.shortName,
        bankCode: nganHangID,
        tenChuTaiKhoan: data.chuTaiKhoan,
        soTaiKhoan: data.soTaiKhoan,
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
  };
  const ErrorMessage = styled(Typography)({
    fontWeight: "400",
    fontSize: "1.7rem",
    textAlign: "center",
    lineHeight: 1.66,

    color: "#f44336",
  });
  return (
    <>
      <LoadingBox isLoading={isLoading} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0,1fr))",
          gap: "10px",
          marginTop: "10px",
          padding: "0px 20px",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
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
            error={errors.tenNganHang}
          >
            <Typography
              sx={{
                marginBottom: "10px",
              }}
            >
              Ngân hàng
            </Typography>
            <Controller
              name="tenNganHang"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-bank"
                  id="select-bank-option"
                  {...register("tenNganHang")}
                  label="Ngân hàng"
                  input={<OptionMenu />}
                  {...field}
                >
                  <OptionMenuItem value="">
                    <em>None</em>
                  </OptionMenuItem>
                  {listBank.map((item, i) => (
                    <OptionMenuItem key={item.bin} value={item.bin}>
                      {item.shortName}
                    </OptionMenuItem>
                  ))}
                </Select>
              )}
              defaultValue=""
            />
            <ErrorMessage>{errors.tenNganHang ? errors.tenNganHang.message : ""}</ErrorMessage>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Controller
              name="chuTaiKhoan"
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder="Chủ tài khoản"
                  size="small"
                  fullWidth
                  error={errors.chuTaiKhoan ? true : false}
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
            <ErrorMessage>{errors.chuTaiKhoan ? errors.chuTaiKhoan.message : ""}</ErrorMessage>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Controller
              name="soTaiKhoan"
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder="Số tài khoản"
                  size="small"
                  fullWidth
                  error={errors.soTaiKhoan ? true : false}
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
            <ErrorMessage>{errors.soTaiKhoan ? errors.soTaiKhoan.message : ""}</ErrorMessage>
          </FormControl>

          <Button
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Thêm
          </Button>
        </form>
      </Box>
    </>
  );
};
export default ThemNganHang;
