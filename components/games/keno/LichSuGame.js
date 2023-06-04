import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import SocketContext from "../../../context/socket";
import { convertDateTime } from "../../../utils/convertTime";
import LoadingBox from "../../homePage/LoadingBox";
const LichSuGame = () => {
  const { data: session, status } = useSession();
  const [listLichSu, setListLichSu] = useState([]);

  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket && status === "authenticated") {
      socket.emit("join-room-keno1p");
      socket.off("ketQuaPhienHienTai").on("ketQuaPhienHienTai", (data) => {
        setListLichSu((state) => {
          let currentArray = state;

          const checkPhienTonTai = currentArray.find((item) => item.phien === data.phien);
          if (!checkPhienTonTai) {
            if (currentArray.length === 10) {
              currentArray.pop();
            }
            return [data, ...currentArray];
          } else {
            return currentArray;
          }
        });
      });
      return () => {
        socket.off("ketQuaPhienHienTai");
      };
    }
  }, [socket, status]);

  const callDataApi = async (status) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno1p`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-lich-su-game-keno-1p", session ? session.user.taiKhoan : null],
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
    }
  }, [data]);
  return (
    <>
      {isLoading && <LoadingBox isLoading={isLoading} />}

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
                        <div className="redball" key={i}>
                          {item}
                        </div>
                      ))}
                    </td>
                    <td>{convertDateTime(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </>
  );
};
export default LichSuGame;
