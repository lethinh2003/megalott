import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import FormRut from "../../components/rutTien/FormRut";
import HuongDan from "../../components/rutTien/HuongDan";
import ThongTinSoDu from "../../components/rutTien/ThongTinSoDu";
const Home = () => {
  const { data: session, status } = useSession();
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

  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}
      <Layout>
        <Typography component={"h1"} className="title-h1">
          Rút tiền
        </Typography>
        {!isLoading && data && data.data && (
          <Box
            sx={{
              paddingTop: "5rem",
            }}
          >
            <ThongTinSoDu />
            <FormRut listBank={data.data} />
            <HuongDan />
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Home;
