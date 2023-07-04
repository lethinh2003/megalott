import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../../../components/admin/Layout";
import ZaloPay from "../../../components/admin/settings/ZaloPay";
const ChiTiet = () => {
  return (
    <>
      <Head>
        <title>Chỉnh sửa cài đặt ZaloPay - Trang quản trị Admin</title>
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
          <ZaloPay />
        </Box>
      </Layout>
    </>
  );
};
export default ChiTiet;
