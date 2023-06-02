import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { OptionMenu, OptionMenuItem } from "../../custom/optionMenu";
import { inputStyles, rootInputStyles, rootStyles } from "../../custom/textfield";

import LoadingBox from "../homePage/LoadingBox";
const FormRut = ({ listBank }) => {
  const getBalance = useSelector((state) => state.balance.balance);
  const [isLoading, setIsLoading] = useState(false);
  // form validation rules
  const validationSchema = Yup.object().shape({
    soTien: Yup.number()
      .typeError("Vui lòng nhập số tiền hợp lệ")
      .required("Vui lòng nhập số tiền hợp lệ")
      .min(1, "Vui lòng nhập số tiền hợp lệ"),
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
      if (getBalance < data.soTien) {
        toast.error("Không đủ tiền để thực hiện hành động này");
        return;
      }
      setIsLoading(true);

      const result = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/lichsurut`, {
        soTien: data.soTien,
        nganHang: data.tenNganHang,
        tenNganHang: listBank.find((item) => item._id == data.tenNganHang).tenNganHang,
      });
      if (result && result.data) {
        toast.success(result.data.message);
        reset();
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

          padding: "0px 20px",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
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
                    <OptionMenuItem key={item._id} value={item._id}>
                      {item.tenNganHang} - {item.tenChuTaiKhoan} - {item.soTaiKhoan}
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
              name="soTien"
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder="Số tiền"
                  size="small"
                  type="number"
                  fullWidth
                  error={errors.soTien ? true : false}
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
              defaultValue={0}
            />
            <ErrorMessage>{errors.soTien ? errors.soTien.message : ""}</ErrorMessage>
          </FormControl>

          <Button
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Rút tiền
          </Button>
        </form>
      </Box>
    </>
  );
};
export default FormRut;
