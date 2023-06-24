import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";
import XucXac3P from "../../../../components/admin/panel/xucxac/3p/XucXac3P";

const XucXac = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Game Xúc Xắc 3P - Trang quản trị Admin</title>
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
            <XucXac3P />
          </Box>
        )}
      </Layout>
    </>
  );
};
export default XucXac;
