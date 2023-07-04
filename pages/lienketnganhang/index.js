import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import DanhSachNganHang from "../../components/lienKetNganHang/DanhSachNganHang";
const Home = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const callDataApi = async (status) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/lienketnganhang/get-danh-sach`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-danh-sach-lien-ket-ngan-hang", session ? session.user.taiKhoan : null],
    () => callDataApi(status),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;

  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}

      <Layout>
        <h1 className="title-h1">Liên kết ngân hàng</h1>

        <Box
          sx={{
            paddingTop: "50px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Box
            sx={{
              paddingTop: "10px",
              textAlign: "center",
            }}
          >
            <Link href="/lienketnganhang/themnganhang">
              <Button>Thêm tài khoản ngân hàng</Button>
            </Link>
          </Box>
          {data && data?.data.length === 0 && (
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              Hiện chưa có ngân hàng
            </Typography>
          )}
          {data && data?.data.length > 0 && <DanhSachNganHang list={data.data} />}
        </Box>
      </Layout>
    </>
  );
};

export default Home;
