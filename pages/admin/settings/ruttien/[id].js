import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, FormControl, Select, Typography } from "@mui/material";
import { useRouter } from "next/router";

import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../../components/admin/Layout";
import { OptionMenu, OptionMenuItem } from "../../../../custom/optionMenu";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../../custom/textfield";
import { convertDateTime } from "../../../../utils/convertTime";
const ChiTiet = ({ ID }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [taiKhoan, setTaiKhoan] = useState("");
  const [nganHang, setNganHang] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [thoiGian, setThoiGian] = useState("");
  const [soTien, setSoTien] = useState(0);
  const [tinhTrang, setTinhTrang] = useState("dangCho");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getThongTin();
  }, []);

  const getThongTin = async () => {
    try {
      setIsLoading(true);
      const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/rut-tien/chi-tiet?id=${ID}`);
      if (results.data && results.data.data) {
        setTaiKhoan(results.data.data.nguoiDung.taiKhoan);
        setSoTien(results.data.data.soTien);
        setNganHang(
          `${results.data.data.nganHang.tenNganHang} - ${results.data.data.nganHang.soTaiKhoan} - ${results.data.data.nganHang.tenChuTaiKhoan}`
        );
        setNoiDung(results.data.data.noiDung);
        setTinhTrang(results.data.data.tinhTrang);
        setThoiGian(convertDateTime(results.data.data.createdAt));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleClickSubmit = async () => {
    try {
      setIsLoading(true);
      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/admin/rut-tien/edit`, {
        ID,
        noiDung,
        soTien,
        taiKhoan,
        tinhTrang,
      });
      toast.success("Chỉnh sửa thành công");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  const listStatus = [
    {
      ten: "Đang chờ",
      value: "dangCho",
    },
    {
      ten: "Hoàn tất",
      value: "hoanTat",
    },
    {
      ten: "Đã hủy",
      value: "daHuy",
    },
  ];
  return (
    <>
      <Head>
        <title>Chi tiết yêu cầu rút tiền - Trang quản trị Admin</title>
      </Head>
      <Layout>
        <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            bgcolor: "background.default",
            justifyContent: "center",
            color: "text.secondary",
            gap: "10px",
            padding: "40px 20px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin">
              Admin
            </Link>
            <Link underline="hover" color="inherit" href="/admin/settings">
              Settings
            </Link>
            <Link underline="hover" color="inherit" href="/admin/settings/ruttien">
              Yêu cầu rút tiền
            </Link>
            <Typography>Chi tiết</Typography>
          </Breadcrumbs>
          <h1
            className="title"
            style={{
              fontSize: "2.5rem",
            }}
          >
            Chi tiết yêu cầu rút tiền
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
            {!isLoading && (
              <>
                <FormControl fullWidth>
                  <Typography>Tài khoản</Typography>
                  <InputComponent
                    size="small"
                    type="text"
                    fullWidth
                    value={taiKhoan}
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
                  <Typography>Ngân hàng</Typography>
                  <InputComponent
                    size="small"
                    type="text"
                    fullWidth
                    value={nganHang}
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
                    size="small"
                    type="text"
                    fullWidth
                    value={soTien}
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
                  <Typography>Nội dung phản hồi</Typography>
                  <InputComponent
                    placeholder="Nội dung"
                    onChange={(e) => setNoiDung(e.target.value)}
                    size="small"
                    type="text"
                    fullWidth
                    value={noiDung}
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
                <FormControl fullWidth>
                  <Typography>Tình trạng</Typography>

                  <Select
                    labelId="select-status"
                    id="select-status-option"
                    label="Status"
                    input={<OptionMenu />}
                    value={tinhTrang}
                    onChange={(e) => setTinhTrang(e.target.value)}
                  >
                    {listStatus.map((item, i) => (
                      <OptionMenuItem key={item.value} value={item.value}>
                        {item.ten}
                      </OptionMenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Typography>Thời gian</Typography>
                  <InputComponent
                    size="small"
                    type="text"
                    fullWidth
                    value={thoiGian}
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

                <Button variant="outlined" onClick={handleClickSubmit}>
                  Chỉnh sửa
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};
export default ChiTiet;
export const getServerSideProps = async (context) => {
  const { params } = context;
  const ID = params.id;

  return {
    props: {
      ID: ID,
    },
  };
};
