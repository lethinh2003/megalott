import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import FormRut from "../../components/rutTien/FormRut";
import HuongDan from "../../components/rutTien/HuongDan";
import ThongTinSoDu from "../../components/rutTien/ThongTinSoDu";
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
        <h1 className="title-h1">Rút tiền</h1>
        {!isLoading && data && data.data && (
          <Box
            sx={{
              paddingTop: "50px",
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
