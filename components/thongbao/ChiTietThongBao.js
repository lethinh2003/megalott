import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Bars } from "react-loading-icons";
import { useQuery } from "react-query";
import { convertDateTime } from "../../utils/convertTime";
const ChiTietThongBao = ({ ID }) => {
  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/thongbao/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery(["get-thong-bao-chi-tiet-users", ID], callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Bars fill="red" width={50} height={50} speed={0.75} />
        </Box>
      )}
      {!isLoading && dataQuery.data && dataQuery.data && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "7px",
            justifyContent: "center",

            overflow: "hidden",
            alignItems: "center",

            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "150px",
            }}
          >
            <img
              src={dataQuery.data.hinhAnh}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              padding: "10px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {dataQuery.data.tieuDe}
            </Typography>
            <Typography sx={{}}>Thời gian tạo: {convertDateTime(dataQuery.data.createdAt)}</Typography>
            <Typography className="content-html" dangerouslySetInnerHTML={{ __html: dataQuery.data.noiDung }} />
          </Box>
        </Box>
      )}
    </>
  );
};
export default ChiTietThongBao;
