import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";
import DieuChinhTiLe from "../../../../components/admin/panel/keno/5p/DieuChinhTiLe";
import Keno5P from "../../../../components/admin/panel/keno/5p/Keno5P";
const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Game Keno 5P - Trang quản trị Admin</title>
      </Head>
      <Layout>
        {status === "authenticated" && (
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
            <Keno5P />
            <DieuChinhTiLe />
          </Box>
        )}
      </Layout>
    </>
  );
};
export default Home;
