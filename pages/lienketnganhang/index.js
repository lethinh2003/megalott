import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import DanhSachNganHang from "../../components/lienKetNganHang/DanhSachNganHang";
const Home = () => {
  const { data: session, status } = useSession();
  const [isOpenAddBank, setIsOpenAddBank] = useState(false);
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/dangnhap");
    return null;
  }
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

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}

      <Layout>
        <Typography component={"h1"} className="title-h1">
          Liên kết ngân hàng
        </Typography>

        <Box
          sx={{
            paddingTop: "5rem",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
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
        </Box>
      </Layout>
    </>
  );
};

export default Home;
