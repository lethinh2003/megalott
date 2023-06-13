import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { Bars } from "react-loading-icons";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import SocketContext from "../../../../context/socket";
import { convertDateTime } from "../../../../utils/convertTime";

const LichSuCuoc = () => {
  const { data: session, status } = useSession();
  const [listLichSu, setListLichSu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingLoadmore, setIsLoadingLoadmore] = useState(false);
  const [isHideLoadmore, setIsHideLoadmore] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket && status === "authenticated") {
      socket.emit("join-room-xucxac3p");
      socket.off("updateLichSuCuocCaNhanXucXac3P").on("updateLichSuCuocCaNhanXucXac3P", (data) => {
        setListLichSu((state) => {
          let currentArray = state;
          const checkPhienTonTai = state.find((item) => item.phien.phien === data.phien.phien);
          if (!checkPhienTonTai) {
            if (currentArray.length >= 10) {
              currentArray.pop();
            }
            return [data, ...currentArray];
          } else {
            // Cập nhật lại đặt cược của phiên
            let newArray = state.shift();
            return [data, ...newArray];
          }
        });
      });
      return () => {
        socket.off("updateLichSuCuocCaNhanXucXac3P");
      };
    }
  }, [socket, status]);

  const callDataApi = async (status) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(
      `${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p/lich-su-cuoc?results=${itemsPerPage}`
    );
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-lich-su-cuoc-game-xucxac-3p", session ? session.user.taiKhoan : null],
    () => callDataApi(status),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;

  useEffect(() => {
    if (data && data.data) {
      setListLichSu(data.data);
      if (data.results === itemsPerPage) {
        setCurrentPage((page) => page + 1);
        setIsHideLoadmore(false);
      } else {
        setIsHideLoadmore(true);
      }
    }
  }, [data]);
  const handleClickLoadmore = async () => {
    try {
      setIsLoadingLoadmore(true);
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p/lich-su-cuoc?page=${currentPage}&results=${itemsPerPage}`
      );
      if (results.data && results.data.data) {
        if (results.data.results === itemsPerPage) {
          setCurrentPage((page) => page + 1);
          setIsHideLoadmore(false);
        } else {
          setIsHideLoadmore(true);
        }
        setListLichSu((state) => [...state, ...results.data.data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingLoadmore(false);
    }
  };
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
      {!isLoading && listLichSu && (
        <Box
          sx={{
            borderRadius: "20px",
            padding: "20px",
            marginTop: "10px",

            backgroundColor: "background.default",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <div className="tab-content">
            <div className="award_tb">
              <table>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <td>Phiên số</td>
                    <td>Nội dung</td>
                    <td>Thời gian</td>
                  </tr>
                </thead>
                <tbody>
                  {listLichSu.map((item, i) => (
                    <tr key={item.phien.phien}>
                      <td>{item.phien.phien}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",

                          flexDirection: "column",
                        }}
                      >
                        {item.datCuoc.map((item, i) => (
                          <Typography
                            key={i}
                            sx={{
                              fontSize: "1.2rem",
                            }}
                          >
                            Bi {item.loaiBi} - {item.loaiCuoc} -{" "}
                            <NumericFormat
                              value={item.tienCuoc}
                              displayType="text"
                              allowLeadingZeros
                              thousandSeparator=","
                            />
                            đ
                          </Typography>
                        ))}
                      </td>
                      <td>{convertDateTime(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isLoadingLoadmore && (
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Bars fill="red" width={50} height={50} speed={0.75} />
            </Box>
          )}
          {!isHideLoadmore && (
            <Button
              onClick={handleClickLoadmore}
              sx={{
                pointerEvents: isLoadingLoadmore ? "none" : "",
                opacity: isLoadingLoadmore ? "0.8" : 1,
              }}
            >
              {isLoadingLoadmore ? "Đang tải..." : "Tải thêm"}
            </Button>
          )}
        </Box>
      )}
    </>
  );
};
export default LichSuCuoc;
