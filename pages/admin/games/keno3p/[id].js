import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";
import ChiTietPhien from "../../../../components/admin/panel/keno/3p/ChiTietPhien";
import LichSuCuoc from "../../../../components/admin/panel/keno/3p/LichSuCuoc";
const ChiTiet = ({ ID }) => {
  return (
    <>
      <Head>
        <title>Chi Tiết Game Keno 3P - Trang quản trị Admin</title>
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
          <ChiTietPhien ID={ID} />
          <LichSuCuoc ID={ID} />
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
