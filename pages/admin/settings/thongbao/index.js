import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";
import ThongBao from "../../../../components/admin/settings/ThongBao/ThongBao";
const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Quản lý thông báo - Trang quản trị Admin</title>
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
            padding: { xs: "40px 10px", md: "40px 20px" },
          }}
        >
          <ThongBao />
        </Box>
      </Layout>
    </>
  );
};
export default Home;
