import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import SocketContext from "../../../../context/socket";
import { convertDateTime } from "../../../../utils/convertTime";
import LoadingBox from "../../../homePage/LoadingBox";

const LichSuCuoc = () => {
  const { data: session, status } = useSession();
  const [listLichSu, setListLichSu] = useState([]);

  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket && status === "authenticated") {
      socket.emit("join-room-keno5p");
      socket.off("updateLichSuCuocCaNhan5P").on("updateLichSuCuocCaNhan5P", (data) => {
        setListLichSu((state) => {
          let currentArray = state;
          const checkPhienTonTai = state.find((item) => item.phien.phien === data.phien.phien);
          if (!checkPhienTonTai) {
            if (currentArray.length === 10) {
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
        socket.off("updateLichSuCuocCaNhan5P");
      };
    }
  }, [socket, status]);

  const callDataApi = async (status) => {
    if (status === "unauthenciated") {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno5p/lich-su-cuoc`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-lich-su-cuoc-game-keno-5p", session ? session.user.taiKhoan : null],
    () => callDataApi(status),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;

  useEffect(() => {
    if (data && data.data) {
      console.log(data.data);
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
                        <Typography key={i}>
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
      </Box>
    </>
  );
};
export default LichSuCuoc;
