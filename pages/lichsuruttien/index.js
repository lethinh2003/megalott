import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import DanhSachLichSu from "../../components/lichSuRutTien/DanhSachLichSu";
const Home = () => {
  const { data: session, status } = useSession();
  const [itemsPerPage, setItemsPerPage] = useState(process.env.LIMIT_RESULTS * 1 || 10);
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const callDataApi = async (status, pageParam) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/lichsurut?page=${pageParam}&results=${itemsPerPage}`
    );
    return results.data;
  };
  const getListQuery = useInfiniteQuery(
    ["get-lich-su-rut-tien", session ? session.user.taiKhoan : null],
    ({ pageParam = 1 }) => callDataApi(status, pageParam),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].results === itemsPerPage) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
  const {
    data,
    isLoading,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getListQuery;

  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}
      {isFetchingNextPage && <LoadingBox isLoading={isFetchingNextPage} />}
      <Layout>
        <h1 className="title-h1">Lịch sử rút tiền</h1>

        <Box
          sx={{
            paddingTop: "50px",
          }}
        >
          {!isLoading && data?.pages.map((group, i) => <DanhSachLichSu key={i} list={group.data} />)}

          {hasNextPage && !isFetchingNextPage && (
            <Box
              sx={{
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              <Button variant="contained" onClick={() => fetchNextPage()}>
                Tải thêm
              </Button>
            </Box>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default Home;
