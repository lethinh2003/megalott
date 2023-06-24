import { Box, Breadcrumbs, Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../../../context/socket";
import { convertDateTime } from "../../../../../utils/convertTime";
import CountdownTimer from "../../../../games/xucxac/CountdownTimer";
const data = [
  { name: "Chẵn", value: 400000 },
  { name: "Lẻ", value: 300000 },
  { name: "Tài", value: 300 },
  { name: "Xỉu", value: 200 },
  { name: "2 số", value: 200 },
  { name: "11", value: 200 },
  { name: "22", value: 200 },
  { name: "33", value: 200 },
  { name: "44", value: 200 },
  { name: "55", value: 200 },
  { name: "66", value: 200 },
  { name: "3 số", value: 200 },
  { name: "111", value: 200 },
  { name: "222", value: 200 },
  { name: "333", value: 200 },
  { name: "444", value: 200 },
  { name: "555", value: 200 },
  { name: "666", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChiTietPhien = ({ ID }) => {
  const socket = useContext(SocketContext);
  const [time, setTime] = useState(0);
  const [phien, setPhien] = useState(0);
  const [ketQua, setKetQua] = useState([0, 0, 0]);
  const [tinhTrang, setTinhTrang] = useState("dangCho");
  const [chonTruocKetQua, setChonTruocKetQua] = useState({
    isTrigger: false,
    position: 0,
  });

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/xucxac3p/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-chi-tiet-game-xuc-xac-3p", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (dataQuery && dataQuery.data) {
      const { phien, tinhTrang, ketQua } = dataQuery.data;
      setPhien(phien);
      setTinhTrang(tinhTrang);
      if (ketQua.length !== 0) {
        setKetQua(ketQua);
      }
      if (tinhTrang === "hoanTat") {
        setChonTruocKetQua({ isTrigger: false });
      }
    }
  }, [dataQuery]);
  useEffect(() => {
    if (socket) {
      socket.emit("join-room-admin-xucxac3p");
      socket.off("refetchDataChiTietPhienGame").on("refetchDataChiTietPhienGame", ({ phien }) => {
        if (phien == ID) {
          refetch();
        }
      });
      socket.off("timerXucXac3P").on("timerXucXac3P", (data) => {
        if (phien === data.phien) {
          setTime(data.current_time);
        }
      });
      socket.off("ketQuaDieuChinhXucXac3P").on("ketQuaDieuChinhXucXac3P", ({ ketQua, phienHienTai }) => {
        if (phien === phienHienTai) {
          setKetQua(ketQua);
        }
      });
      return () => {
        socket.off("refetchDataChiTietPhienGame");
        socket.off("timerXucXac3P");
        socket.off("ketQuaDieuChinhXucXac3P");
      };
    }
  }, [socket, phien, tinhTrang]);
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);

  const BoxContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    background: "#00b977",
    borderRadius: "10px",
    height: "12rem",
    marginTop: "30px",
    padding: "10px",
    position: "relative",
    "&:before, &:after": {
      content: `""`,
      display: "block",
      height: "0.69333rem",
      position: "absolute",
      top: "50%",

      transform: "translateY(-50%)",
      width: "0.13333rem",
      zIndex: 0,
    },
    "&:before": {
      background: "#008b59",
      borderRadius: "0.13333rem 0 0 0.13333rem",
      left: "-0.13333rem",
    },
    "&:after": {
      background: "#008b59",
      borderRadius: "0.13333rem 0 0 0.13333rem",
      right: "-0.13333rem",
    },
    "& .box": {
      gap: "5px",
      alignItems: "center",
      background: "#003c26",
      borderRadius: "0.13333rem",
      display: "flex",
      height: "100%",
      justifyContent: "space-between",
      padding: "5px",
      position: "relative",
      width: "100%",
      "&:before, &:after": {
        content: `""`,
        borderBottom: "10px solid transparent",
        borderTop: "10px solid transparent",
        height: "0",
        position: "absolute",
        width: 0,
        zIndex: 3,
      },
      "&:before": {
        borderLeft: "15px solid #00b977",
        borderRight: "10px solid transparent",
        left: 0,
      },
      "&:after": {
        borderLeft: "10px solid transparent",
        borderRight: "15px solid #00b977",
        right: 0,
      },

      "& .slot-column": {
        background: "#333",
        borderRadius: "0.10667rem",
        display: "inline-block",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        textAlign: "center",
        verticalAlign: "bottom",
        width: "calc(20% - 0.10667rem)",
        "& .slot-transform": {
          transform: "translateY(-11.7rem)",
          "&.slot-scroll": {
            WebkitAnimation: "slotScroll 3s cubic-bezier(0.65, 0.02, 0.65, 1.06) infinite",
            animation: "slotScroll 3s cubic-bezier(0.65, 0.02, 0.65, 1.06) infinite",
            WebkitAnimationFillMode: "forwards",
            animationFillMode: "forwards",
          },

          "& .slot-num": {
            background: "#e1e1ec",
            borderRadius: "50%",
            color: "#0006",
            fontSize: "3rem",
            fontWeight: 700,
            height: "6rem",
            lineHeight: "60px",

            margin: "0 auto 5px",
            width: "6rem",
            "&.active": {
              background: "#00e065",
              color: "#fff",
            },
          },
        },
      },
    },
  }));
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
    const getPrevKetQua = ketQua;
    getPrevKetQua[chonTruocKetQua.position] = num;
    setKetQua(getPrevKetQua);
  };
  const handleClickConfirmDieuChinhKetQua = () => {
    if (ketQua.length < 3) {
      toast.error("Vui lòng chọn đầy đủ kết quả");
      return;
    }
    const checkValidDice = ketQua.filter((item) => item < 1 || item > 6);

    if (checkValidDice.length > 0) {
      toast.error("Vui lòng chọn kết quả hợp lệ");
      return;
    }
    if (socket) {
      socket.emit("set-ket-qua-dieu-chinh-xuc-xac-3p", ketQua);
      toast.success("Điều chỉnh thành công");
      setChonTruocKetQua((prev) => ({ ...prev, isTrigger: false }));
    }
  };
  return (
    <>
      <Head>
        <title>Game Xúc Xắc 3P - Trang quản trị Admin</title>
      </Head>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/games">
          Games
        </Link>
        <Link underline="hover" color="inherit" href="/admin/games/xucxac3p">
          Xúc Xắc 3P
        </Link>
        <Typography>Chi tiết</Typography>
      </Breadcrumbs>
      <h1 className="title">Chi Tiết Phiên Xúc Xắc 3P</h1>

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
            <BoxContainer className="box-quay">
              <Box className="box">
                {ketQua.map((item, i) => (
                  <Box
                    key={i}
                    className={`xucxac${item}`}
                    sx={{
                      cursor: tinhTrang === "dangCho" ? "pointer" : null,
                    }}
                    onClick={() => handleClickOpenBangChonTruocKetQua(i)}
                  ></Box>
                ))}
              </Box>
            </BoxContainer>
            {chonTruocKetQua.isTrigger && (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Bảng chọn trước kết quả cho xúc xắc {chonTruocKetQua.position + 1}:
                </Typography>
                <Box
                  className="box-ketqua"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    "&.box-ketqua [class^=xucxac]": {
                      backgroundSize: "4rem",
                      height: "4rem",
                      width: "4rem",
                    },
                  }}
                >
                  {Array.from({ length: 6 }).map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickChonTruocKetQua(i + 1)}
                      className={`xucxac${i + 1}`}
                    ></Box>
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
                    setKetQua([0, 0, 0]);
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
