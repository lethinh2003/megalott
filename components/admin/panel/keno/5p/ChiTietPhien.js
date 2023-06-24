import { Box, Breadcrumbs, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../../../context/socket";
import { convertDateTime } from "../../../../../utils/convertTime";
import CountdownTimer from "../../../../games/xucxac/CountdownTimer";
import BoxKetQua from "./BoxKetQua";
const ChiTietPhien = ({ ID }) => {
  const socket = useContext(SocketContext);
  const [time, setTime] = useState(0);
  const [phien, setPhien] = useState(0);
  const [ketQua, setKetQua] = useState([0, 0, 0, 0, 0]);
  const [tinhTrang, setTinhTrang] = useState("dangCho");
  const [chonTruocKetQua, setChonTruocKetQua] = useState({
    isTrigger: false,
    position: 0,
  });

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/keno5p/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-chi-tiet-game-keno-5p", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (dataQuery && dataQuery.data) {
      console.log(dataQuery.data);
      const { phien, tinhTrang, ketQua } = dataQuery.data;
      setPhien(phien);
      setTinhTrang(tinhTrang);
      if (ketQua.length !== 0) {
        setKetQua(ketQua);
        console.log(ketQua);
      }
      if (tinhTrang === "hoanTat") {
        setChonTruocKetQua({ isTrigger: false });
      }
    }
  }, [dataQuery]);
  useEffect(() => {
    if (socket) {
      socket.emit("join-room-admin-keno5p");
      socket.off("refetchDataChiTietPhienGameKeno5P").on("refetchDataChiTietPhienGameKeno5P", ({ phien }) => {
        if (phien == ID) {
          refetch();
        }
      });
      socket.off("timerKeno5P").on("timerKeno5P", (data) => {
        if (phien === data.phien) {
          setTime(data.current_time);
        }
      });
      socket.off("ketQuaDieuChinhKeno5P").on("ketQuaDieuChinhKeno5P", ({ ketQua, phienHienTai }) => {
        if (phien === phienHienTai) {
          setKetQua(ketQua);
        }
      });
      return () => {
        socket.off("refetchDataChiTietPhienGameKeno5P");
        socket.off("timerKeno5P");
        socket.off("ketQuaDieuChinhKeno5P");
      };
    }
  }, [socket, phien, tinhTrang]);
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);

  const convertTinhTrang = (tinhTrang) => {
    if (tinhTrang === "dangCho") {
      return "đang chờ";
    }
    if (tinhTrang === "hoanTat") {
      return "hoàn tất";
    }
  };

  const handleClickOpenBangChonTruocKetQua = (position) => {
    if (tinhTrang !== "dangCho") {
      return;
    }
    setChonTruocKetQua({ isTrigger: true, position: position });
  };
  const handleClickChonTruocKetQua = (num) => {
    if (tinhTrang !== "dangCho") {
      return;
    }
    const getPrevKetQua = [...ketQua];
    getPrevKetQua[chonTruocKetQua.position] = num;

    setKetQua(getPrevKetQua);
  };
  const handleClickConfirmDieuChinhKetQua = () => {
    if (ketQua.length < 5) {
      toast.error("Vui lòng chọn đầy đủ kết quả");
      return;
    }
    const checkValidDice = ketQua.filter((item) => item < 0 || item > 9);

    if (checkValidDice.length > 0) {
      toast.error("Vui lòng chọn kết quả hợp lệ");
      return;
    }
    if (socket) {
      socket.emit("set-ket-qua-dieu-chinh-keno-5p", ketQua);
      toast.success("Điều chỉnh thành công");
      setChonTruocKetQua((prev) => ({ ...prev, isTrigger: false }));
    }
  };
  return (
    <>
      <Head>
        <title>Game Keno 5P - Trang quản trị Admin</title>
      </Head>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/games">
          Games
        </Link>
        <Link underline="hover" color="inherit" href="/admin/games/keno5p">
          Keno5P
        </Link>
        <Typography>Chi tiết</Typography>
      </Breadcrumbs>
      <h1 className="title">Chi Tiết Phiên Keno 5P</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {isLoading && <CircularProgress color="inherit" />}
        {!isLoading && dataQuery && dataQuery.data && (
          <>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Phiên: {phien}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Tình trạng: {convertTinhTrang(tinhTrang)}
            </Typography>
            {tinhTrang === "dangCho" && (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Thời gian còn lại
                </Typography>
                <CountdownTimer countdownTime={time} />
              </>
            )}
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Kết quả: {tinhTrang === "dangCho" ? "Click vào các nút để điều chỉnh kết quả" : ""}
            </Typography>
            <BoxKetQua ketQua={ketQua} handleClickOpenBangChonTruocKetQua={handleClickOpenBangChonTruocKetQua} />
            {chonTruocKetQua.isTrigger && (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Bảng chọn trước kết quả cho bi {chonTruocKetQua.position + 1}:
                </Typography>
                <Box
                  className="box-ketqua"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    "&.box-ketqua [class^=xucxac]": {
                      backgroundSize: "4rem",
                      height: "4rem",
                      width: "4rem",
                    },
                  }}
                >
                  {Array.from({ length: 10 }).map((item, i) => (
                    <Button
                      key={i}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickChonTruocKetQua(i)}
                    >
                      {i}
                    </Button>
                  ))}
                </Box>

                <Button
                  onClick={() => handleClickConfirmDieuChinhKetQua()}
                  sx={{
                    marginTop: "10px",
                  }}
                >
                  Xác nhận
                </Button>
                <Button
                  onClick={() => {
                    setChonTruocKetQua((prev) => ({ ...prev, isTrigger: false }));
                    setKetQua([0, 0, 0, 0, 0]);
                  }}
                  sx={{
                    marginTop: "10px",
                  }}
                >
                  Hủy chỉnh sửa
                </Button>
              </>
            )}
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Thời gian: {convertDateTime(dataQuery.data.createdAt)}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};
export default ChiTietPhien;
