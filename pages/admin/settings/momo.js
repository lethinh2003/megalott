import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../../../components/admin/Layout";
import Momo from "../../../components/admin/settings/Momo";
const ChiTiet = () => {
  return (
    <>
      <Head>
        <title>Chỉnh sửa cài đặt Momo - Trang quản trị Admin</title>
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
          <Momo />
        </Box>
      </Layout>
    </>
  );
};
export default ChiTiet;
