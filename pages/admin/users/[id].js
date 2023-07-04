import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../../../components/admin/Layout";
import BienDongSoDu from "../../../components/admin/users/BienDongSoDu";
import ChiTietNguoiDung from "../../../components/admin/users/ChiTietNguoiDung";
import DanhSachNganHang from "../../../components/admin/users/DanhSachNganHang";
import LichSuNap from "../../../components/admin/users/LichSuNap";
import LichSuRut from "../../../components/admin/users/LichSuRut";
const ChiTiet = ({ ID }) => {
  return (
    <>
      <Head>
        <title>Chi tiết người dùng - Trang quản trị Admin</title>
      </Head>
      <Layout>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            bgcolor: "background.default",
            justifyContent: "center",
            color: "text.primary",
            gap: "10px",
            padding: "40px 20px",
          }}
        >
          <ChiTietNguoiDung ID={ID} />
          <DanhSachNganHang ID={ID} />
          <LichSuNap ID={ID} />
          <LichSuRut ID={ID} />
          <BienDongSoDu ID={ID} />
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
