import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import DanhSachBank from "../../components/napTien/DanhSachBank";
import HuongDan from "../../components/napTien/HuongDan";
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
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/hethong/get-ngan-hang`);
    console.log(results.data);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-ngan-hang-nap-tien", session ? session.user.taiKhoan : null],
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
        <h1 className="title-h1">Nạp tiền</h1>
        {!isLoading && data && data.data && (
          <Box
            sx={{
              paddingTop: "50px",
            }}
          >
            <DanhSachBank danhSachNganHang={data.data} />
            <HuongDan />
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Home;
