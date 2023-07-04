import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, FormControl, Select, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../context/socket";
import { OptionMenu, OptionMenuItem } from "../../../custom/optionMenu";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../custom/textfield";

const ZaloPay = () => {
  const socket = useContext(SocketContext);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const [zalopayConfigs, setZalopayConfigs] = useState({
    tenChuTaiKhoan: "",
    soTaiKhoan: "",
    status: true,
    token: "",
    code: "",
    napTienZalopayAuto: false,
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
      setZalopayConfigs({
        tenChuTaiKhoan: dataQuery.data.danhSachNganHang[1].tenChuTaiKhoan,
        soTaiKhoan: dataQuery.data.danhSachNganHang[1].soTaiKhoan,
        status: dataQuery.data.danhSachNganHang[1].status,
        token: dataQuery.data.zalopayConfigs.token,
        code: dataQuery.data.zalopayConfigs.code,
        napTienZalopayAuto: dataQuery.data.zalopayConfigs.napTienZalopayAuto,
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
      "chinh-sua-zalopay-admin",
      {
        zalopayConfigs,
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

        <Typography>ZaloPay</Typography>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Cài đặt ZaloPay
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
                value={zalopayConfigs.tenChuTaiKhoan}
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
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, tenChuTaiKhoan: e.target.value }))}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Số tài khoản</Typography>
              <InputComponent
                placeholder="Số tài khoản"
                size="small"
                type="text"
                fullWidth
                value={zalopayConfigs.soTaiKhoan}
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
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, soTaiKhoan: e.target.value }))}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography>Hiển thị</Typography>

              <Select
                labelId="select-status"
                id="select-status-option"
                label="Status"
                input={<OptionMenu />}
                value={zalopayConfigs.status}
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, status: e.target.value }))}
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
                value={zalopayConfigs.token}
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
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, token: e.target.value }))}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Code</Typography>
              <InputComponent
                placeholder="Code"
                size="small"
                type="text"
                fullWidth
                value={zalopayConfigs.code}
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
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, code: e.target.value }))}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography>Bật/Tắt nạp tiền tự động</Typography>

              <Select
                labelId="select-status-auto"
                id="select-status-auto-option"
                label="Status Auto"
                input={<OptionMenu />}
                value={zalopayConfigs.napTienZalopayAuto}
                onChange={(e) => setZalopayConfigs((state) => ({ ...state, napTienZalopayAuto: e.target.value }))}
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
export default ZaloPay;
