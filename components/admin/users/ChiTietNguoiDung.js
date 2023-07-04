import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../context/socket";
import { OptionMenu, OptionMenuItem } from "../../../custom/optionMenu";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../custom/textfield";
import { isNumeric } from "../../../utils/convertMoney";
import { convertDateTime } from "../../../utils/convertTime";

const ChiTietNguoiDung = ({ ID }) => {
  const socket = useContext(SocketContext);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [status, setStatus] = useState(true);
  const [role, setRole] = useState("user");
  const [congTien, setCongTien] = useState(0);
  const [truTien, setTruTien] = useState(0);
  const [password, setPassword] = useState("");

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/users/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-chi-tiet-users", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (dataQuery && dataQuery.data) {
      setStatus(dataQuery.data.status);
      setRole(dataQuery.data.role);
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
      tenStatus: "Đang sử dụng",
      value: true,
    },
    {
      tenStatus: "Ngừng sử dụng",
      value: false,
    },
  ];
  const listRole = [
    {
      ten: "Quản trị",
      value: "admin",
    },
    {
      ten: "Người dùng",
      value: "user",
    },
  ];
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleChangeCongTien = (e) => {
    setCongTien(e.target.value);
  };
  const handleChangeTruTien = (e) => {
    setTruTien(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClickCongTruTien = (type = 1) => {
    if (type === 1) {
      if (!isNumeric(congTien) || congTien <= 0) {
        toast.error("Vui lòng nhập tiền cộng hợp lệ");
        return;
      }
      setIsLoadingState(true);
      socket.emit(
        "cong-tien-admin",
        {
          tienCong: parseInt(congTien),
          userID: ID,
          taiKhoan: dataQuery.data.taiKhoan,
        },
        (callback) => {
          if (callback) {
            setIsLoadingState(false);
            if (callback.status === "error") {
              toast.error("Có lỗi xảy ra khi cộng tiền");
            } else {
              setCongTien(0);
              toast.success("Cộng tiền thành công");
              refetch();
            }
          }
        }
      );
    } else if (type === 2) {
      if (!isNumeric(truTien) || truTien <= 0) {
        toast.error("Vui lòng nhập tiền trừ hợp lệ");
        return;
      }
      setIsLoadingState(true);
      socket.emit(
        "cong-tien-admin",
        {
          tienCong: -parseInt(truTien),
          userID: ID,
          taiKhoan: dataQuery.data.taiKhoan,
        },
        (callback) => {
          if (callback) {
            setIsLoadingState(false);
            if (callback.status === "error") {
              toast.error("Có lỗi xảy ra khi cộng tiền");
            } else {
              setTruTien(0);
              toast.success("Trừ tiền thành công");
              refetch();
            }
          }
        }
      );
    }
  };
  const handleClickChangeInfo = () => {
    setIsLoadingState(true);
    socket.emit(
      "chinh-sua-thong-tin-admin",
      {
        status: status,
        roleUser: role,
        userID: ID,
        taiKhoan: dataQuery.data.taiKhoan,
      },
      (callback) => {
        if (callback) {
          setIsLoadingState(false);
          if (callback.status === "error") {
            toast.error("Có lỗi xảy ra khi chỉnh sửa thông tin người dùng");
          } else {
            toast.success("Chỉnh sửa thành công");
            refetch();
          }
        }
      }
    );
  };
  const handleClickChangePassword = () => {
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu hợp lệ");
      return;
    }
    if (password.trim().length < 6) {
      toast.error("Vui lòng nhập mật khẩu từ 6 kí tự trở lên");
      return;
    }
    setIsLoadingState(true);
    socket.emit(
      "chinh-sua-password-admin",
      {
        password: password,

        userID: ID,
        taiKhoan: dataQuery.data.taiKhoan,
      },
      (callback) => {
        if (callback) {
          setIsLoadingState(false);
          if (callback.status === "error") {
            toast.error("Có lỗi xảy ra khi chỉnh sửa mật khẩu người dùng");
          } else {
            setPassword("");
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
        <Link underline="hover" color="inherit" href="/admin/users">
          Users
        </Link>

        <Typography>Chi tiết</Typography>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Chi Tiết Người Dùng
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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, minmax(0,1fr))",

                  md: "repeat(2, minmax(0,1fr))",
                },
                gap: "20px",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#201c58",
                  height: "220px",

                  display: "flex",

                  padding: "20px",

                  minWidth: "200px",

                  boxShadow: "-1px 2px 14px 5px #edf0f8",
                  borderRadius: "30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <img src="https://i.imgur.com/EYUoMLa.png" />
                  </Box>

                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                    }}
                  >
                    <NumericFormat
                      value={dataQuery.data.tienCuoc}
                      displayType="text"
                      allowLeadingZeros
                      thousandSeparator=","
                      suffix="đ"
                    />
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  >
                    Tổng tiền cược
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#201c58",
                  height: "220px",

                  display: "flex",

                  padding: "20px",

                  minWidth: "200px",

                  boxShadow: "-1px 2px 14px 5px #edf0f8",
                  borderRadius: "30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <img src="https://i.imgur.com/QD9tfI3.png" />
                  </Box>

                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                    }}
                  >
                    <NumericFormat
                      value={dataQuery.data.tienThang}
                      displayType="text"
                      allowLeadingZeros
                      thousandSeparator=","
                      suffix="đ"
                    />
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  >
                    Tổng tiền thắng
                  </Typography>
                </Box>
              </Card>
            </Box>
            <FormControl fullWidth>
              <Typography>Tài khoản</Typography>
              <InputComponent
                placeholder="Tài khoản"
                size="small"
                type="text"
                fullWidth
                value={dataQuery.data.taiKhoan}
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
                disabled
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Số tiền</Typography>
              <InputComponent
                placeholder="Số tiền"
                size="small"
                type="text"
                fullWidth
                value={dataQuery.data.money}
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
                disabled
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Thời gian tạo</Typography>
              <InputComponent
                placeholder="Thời gian tạo"
                size="small"
                type="text"
                fullWidth
                value={convertDateTime(dataQuery.data.createdAt)}
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
                disabled
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Tình trạng</Typography>

              <Select
                labelId="select-status"
                id="select-status-option"
                label="Status"
                input={<OptionMenu />}
                value={status}
                onChange={handleChangeStatus}
              >
                {listStatus.map((item, i) => (
                  <OptionMenuItem key={item.value} value={item.value}>
                    {item.tenStatus}
                  </OptionMenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography>Phân quyền</Typography>

              <Select
                labelId="select-role"
                id="select-role-option"
                label="Role"
                input={<OptionMenu />}
                value={role}
                onChange={handleChangeRole}
              >
                {listRole.map((item, i) => (
                  <OptionMenuItem key={item.value} value={item.value}>
                    {item.ten}
                  </OptionMenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handleClickChangeInfo}>Chỉnh sửa</Button>

            <FormControl fullWidth>
              <Typography>Cộng tiền</Typography>
              <InputComponent
                placeholder="Số tiền"
                size="small"
                type="number"
                fullWidth
                value={congTien}
                onChange={handleChangeCongTien}
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
              />
            </FormControl>
            <Button onClick={() => handleClickCongTruTien(1)}>Cộng</Button>
            <FormControl fullWidth>
              <Typography>Trừ tiền</Typography>
              <InputComponent
                placeholder="Số tiền"
                size="small"
                type="number"
                fullWidth
                value={truTien}
                onChange={handleChangeTruTien}
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
              />
            </FormControl>
            <Button onClick={() => handleClickCongTruTien(2)}>Trừ</Button>
            <FormControl fullWidth>
              <Typography>Đổi mật khẩu</Typography>
              <InputComponent
                placeholder="Mật khẩu"
                size="small"
                type="text"
                fullWidth
                value={password}
                onChange={handleChangePassword}
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
              />
            </FormControl>
            <Button onClick={handleClickChangePassword}>Đổi</Button>
          </>
        )}
      </Box>
    </>
  );
};
export default ChiTietNguoiDung;
