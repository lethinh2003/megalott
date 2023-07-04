import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, FormControl, Select, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../context/socket";
import { OptionMenu, OptionMenuItem } from "../../../custom/optionMenu";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../custom/textfield";

const Momo = () => {
  const socket = useContext(SocketContext);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const [momoConfigs, setMomoConfigs] = useState({
    tenChuTaiKhoan: "",
    soTaiKhoan: "",
    status: true,
    token: "",
    napTienMomoAuto: false,
  });

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/hethong`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-he-thong", callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (dataQuery && dataQuery.data) {
      setMomoConfigs({
        tenChuTaiKhoan: dataQuery.data.danhSachNganHang[0].tenChuTaiKhoan,
        soTaiKhoan: dataQuery.data.danhSachNganHang[0].soTaiKhoan,
        status: dataQuery.data.danhSachNganHang[0].status,
        token: dataQuery.data.momoConfigs.token,
        napTienMomoAuto: dataQuery.data.momoConfigs.napTienMomoAuto,
      });
    }
  }, [dataQuery]);
  useEffect(() => {
    if (socket) {
      return () => {};
    }
  }, [socket]);
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);

  const listStatus = [
    {
      tenStatus: "Hiển thị",
      value: true,
    },
    {
      tenStatus: "Ẩn",
      value: false,
    },
  ];

  const handleClickChange = () => {
    setIsLoadingState(true);
    socket.emit(
      "chinh-sua-momo-admin",
      {
        momoConfigs,
      },
      (callback) => {
        if (callback) {
          setIsLoadingState(false);
          if (callback.status === "error") {
            toast.error("Có lỗi xảy ra khi chỉnh sửa mật khẩu người dùng");
          } else {
            refetch();
            toast.success("Chỉnh sửa thành công");
          }
        }
      }
    );
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/settings">
          Settings
        </Link>

        <Typography>Momo</Typography>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Cài đặt Momo
      </h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px",
          gap: "10px",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {isLoadingState && (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoadingState}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {isLoading && <CircularProgress color="inherit" />}
        {!isLoading && dataQuery && dataQuery.data && (
          <>
            <FormControl fullWidth>
              <Typography>Tên chủ tài khoản</Typography>
              <InputComponent
                placeholder="Tên Chủ tài khoản"
                size="small"
                type="text"
                fullWidth
                value={momoConfigs.tenChuTaiKhoan}
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
                onChange={(e) => setMomoConfigs((state) => ({ ...state, tenChuTaiKhoan: e.target.value }))}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Số tài khoản</Typography>
              <InputComponent
                placeholder="Số tài khoản"
                size="small"
                type="text"
                fullWidth
                value={momoConfigs.soTaiKhoan}
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
                onChange={(e) => setMomoConfigs((state) => ({ ...state, soTaiKhoan: e.target.value }))}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography>Hiển thị</Typography>

              <Select
                labelId="select-status"
                id="select-status-option"
                label="Status"
                input={<OptionMenu />}
                value={momoConfigs.status}
                onChange={(e) => setMomoConfigs((state) => ({ ...state, status: e.target.value }))}
              >
                {listStatus.map((item, i) => (
                  <OptionMenuItem key={item.value} value={item.value}>
                    {item.tenStatus}
                  </OptionMenuItem>
                ))}
              </Select>
            </FormControl>

            <h1
              className="title"
              style={{
                fontSize: "2.5rem",
              }}
            >
              Nạp tiền tự động
            </h1>
            <FormControl fullWidth>
              <Typography>Token</Typography>
              <InputComponent
                placeholder="Token"
                size="small"
                type="text"
                fullWidth
                value={momoConfigs.token}
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
                onChange={(e) => setMomoConfigs((state) => ({ ...state, token: e.target.value }))}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography>Bật/Tắt nạp tiền tự động</Typography>

              <Select
                labelId="select-status-auto"
                id="select-status-auto-option"
                label="Status Auto"
                input={<OptionMenu />}
                value={momoConfigs.napTienMomoAuto}
                onChange={(e) => setMomoConfigs((state) => ({ ...state, napTienMomoAuto: e.target.value }))}
              >
                <OptionMenuItem value={true}>Bật</OptionMenuItem>
                <OptionMenuItem value={false}>Tắt</OptionMenuItem>
              </Select>
            </FormControl>

            <Button onClick={handleClickChange}>Lưu thay đổi</Button>
          </>
        )}
      </Box>
    </>
  );
};
export default Momo;
