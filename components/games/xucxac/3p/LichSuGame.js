import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import SocketContext from "../../../../context/socket";
import { convertDateTime } from "../../../../utils/convertTime";

import { Bars } from "react-loading-icons";
const LichSuGame = () => {
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
      socket.off("ketQuaPhienHienTaiXucXac3P").on("ketQuaPhienHienTaiXucXac3P", (data) => {
        setListLichSu((state) => {
          let currentArray = state;

          const checkPhienTonTai = currentArray.find((item) => item.phien === data.phien);
          if (!checkPhienTonTai) {
            if (currentArray.length >= 10) {
              currentArray.pop();
            }
            return [data, ...currentArray];
          } else {
            return currentArray;
          }
        });
      });
      return () => {
        socket.off("ketQuaPhienHienTaiXucXac3P");
      };
    }
  }, [socket, status]);

  const callDataApi = async (status) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p?results=${itemsPerPage}`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-lich-su-game-xucxac-3p", session ? session.user.taiKhoan : null],
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
        `${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p?page=${currentPage}&results=${itemsPerPage}`
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
            <div className="award_tb  box-ketqua">
              <table>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <td>Phiên số</td>
                    <td>Kết quả</td>
                    <td>Thời gian</td>
                  </tr>
                </thead>
                <tbody>
                  {listLichSu.map((item, i) => (
                    <tr key={item.phien}>
                      <td>{item.phien}</td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        {item.ketQua.map((item, i) => (
                          <div className={`xucxac${item}`} key={i}></div>
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
export default LichSuGame;
