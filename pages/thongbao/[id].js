import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import ChiTietThongBao from "../../components/thongbao/ChiTietThongBao";
const Home = ({ ID }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <>
      <Layout>
        <h1 className="title-h1">Chi Tiết Thông báo</h1>

        <Box
          sx={{
            paddingTop: "50px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <ChiTietThongBao ID={ID} />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
export const getServerSideProps = async (context) => {
  const { params } = context;
  const ID = params.id;

  return {
    props: {
      ID: ID,
    },
  };
};
