import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ThemNganHang from "../../components/lienKetNganHang/ThemNganHang";
const Home = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/dangnhap");
    return null;
  }

  return (
    <>
      <Layout>
        <h1 className="title-h1">Thêm ngân hàng</h1>

        <Box
          sx={{
            paddingTop: "50px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <ThemNganHang />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
