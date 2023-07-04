import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";
import RutTien from "../../../../components/admin/settings/RutTien/RutTien";
const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Quản lý yêu cầu rút tiền - Trang quản trị Admin</title>
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
          <RutTien />
        </Box>
      </Layout>
    </>
  );
};
export default Home;
