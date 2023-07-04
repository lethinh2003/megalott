import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import SocketContext from "../../../../../context/socket";

import { convertDateTime } from "../../../../../utils/convertTime";

const convertChiTietCuoc = (chiTietCuoc, loaiCuoc) => {
  if (chiTietCuoc === "batky" && loaiCuoc === "2SO") {
    return "2 số bất kỳ";
  } else if (chiTietCuoc === "batky" && loaiCuoc === "3SO") {
    return "3 số bất kỳ";
  } else {
    return chiTietCuoc;
  }
};
const LichSuCuoc = ({ ID }) => {
  const socket = useContext(SocketContext);

  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/xucxac3p/lich-su-cuoc?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-cuoc-chi-tiet-game-xuc-xac-3p", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (socket) {
      socket.emit("join-room-admin-xucxac3p");
      socket.off("refetchDataLichSuCuocGame").on("refetchDataLichSuCuocGame", ({ phien }) => {
        if (phien == ID) {
          refetch();
        }
      });
      return () => {
        socket.off("refetchDataLichSuCuocGame");
      };
    }
  }, [socket]);
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);
  useEffect(() => {
    if (dataQuery && dataQuery.data.length > 0) {
      const tempDataChart = [];
      const CuocC = { name: "Chẵn", value: 0 };
      const CuocL = { name: "Lẻ", value: 0 };
      const CuocT = { name: "Tài", value: 0 };
      const CuocX = { name: "Xỉu", value: 0 };
      const Cuoc2So = { name: "2 số", value: 0 };
      const Cuoc11 = { name: "11", value: 0 };
      const Cuoc22 = { name: "22", value: 0 };
      const Cuoc33 = { name: "33", value: 0 };
      const Cuoc44 = { name: "44", value: 0 };
      const Cuoc55 = { name: "55", value: 0 };
      const Cuoc66 = { name: "66", value: 0 };
      const Cuoc3So = { name: "3 số", value: 0 };
      const Cuoc111 = { name: "111", value: 0 };
      const Cuoc222 = { name: "222", value: 0 };
      const Cuoc333 = { name: "333", value: 0 };
      const Cuoc444 = { name: "444", value: 0 };
      const Cuoc555 = { name: "555", value: 0 };
      const Cuoc666 = { name: "666", value: 0 };
      dataQuery.data.map((item) => {
        item.datCuoc.map((itemCuoc) => {
          if (itemCuoc.chiTietCuoc === "C") {
            CuocC.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "L") {
            CuocL.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "T") {
            CuocT.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "X") {
            CuocX.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "batky" && itemCuoc.loaiCuoc === "2SO") {
            Cuoc2So.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "11") {
            Cuoc11.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "22") {
            Cuoc22.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "33") {
            Cuoc33.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "44") {
            Cuoc44.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "55") {
            Cuoc55.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "66") {
            Cuoc66.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "batky" && itemCuoc.loaiCuoc === "3SO") {
            Cuoc3So.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "111") {
            Cuoc111.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "222") {
            Cuoc222.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "333") {
            Cuoc333.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "444") {
            Cuoc444.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "555") {
            Cuoc555.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.chiTietCuoc === "666") {
            Cuoc666.value += itemCuoc.tienCuoc;
          }
        });
      });
      tempDataChart.push(
        CuocC,
        CuocL,
        CuocT,
        CuocX,
        Cuoc2So,
        Cuoc11,
        Cuoc22,
        Cuoc33,
        Cuoc44,
        Cuoc55,
        Cuoc66,
        Cuoc3So,
        Cuoc111,
        Cuoc222,
        Cuoc333,
        Cuoc444,
        Cuoc555,
        Cuoc666
      );

      setDataChart(tempDataChart);
      const newData = dataQuery.data.map((item, i) => ({
        id: item._id,
        nguoiDung: item.nguoiDung.taiKhoan,
        noiDung: item.datCuoc,
        tongTienCuoc: item.datCuoc.reduce((a, b) => a + b.tienCuoc, 0),

        stt: i + 1,

        ketQua: item.ketQua,
        tinhTrang: item.tinhTrang,

        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "nguoiDung", headerName: "Nguời dùng", width: 100 },
    {
      field: "noiDung",
      headerName: "Nội dung",
      width: 250,
      height: 200,
      renderCell: (params) => (
        <Box>
          {params.row.noiDung.map((item, i) => (
            <Typography
              key={i}
              sx={{
                fontSize: "1.2rem",
              }}
            >
              {convertChiTietCuoc(item.chiTietCuoc, item.loaiCuoc)} -{" "}
              <NumericFormat value={item.tienCuoc} displayType="text" allowLeadingZeros thousandSeparator="," />đ
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      field: "tongTienCuoc",
      headerName: "Tổng tiền cược",
      width: 200,
      renderCell: (params) => (
        <NumericFormat value={params.value} displayType="text" allowLeadingZeros thousandSeparator="," suffix="đ" />
      ),
    },
    {
      field: "tinhTrang",
      headerName: "Tình trạng",
      width: 250,
      cellClassName: (params) => {
        if (params.value === "đang chờ") {
          return "trangthai_dangcho";
        } else if (params.value === "hoàn tất") {
          return "trangthai_hoantat";
        } else {
          return "";
        }
      },
      valueGetter: (params) => {
        if (params.row.tinhTrang === "dangCho") {
          return "đang chờ";
        } else if (params.row.tinhTrang === "hoanTat") {
          return "hoàn tất";
        } else {
          return "";
        }
      },
    },
    { field: "createdAt", headerName: "Thời gian", width: 250 },
  ];

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "text.secondary",

          height: 500,
          width: "100%",
          "& .trangthai_hoantat": {
            color: "#1fc67c",
          },
          "& .trangthai_dangcho": {
            color: "#1a3e72",
          },

          "& .MuiPaper-root ": {
            color: "#000000",
          },
        }}
      >
        <h1
          className="title"
          style={{
            justifyContent: "center",
            fontSize: "2.5rem",
          }}
        >
          Tổng tiền cược
        </h1>
        {isLoading && <CircularProgress color="inherit" />}

        {!isLoading && (
          <>
            <BarChart
              style={{
                fontSize: "1.5rem",
                maxWidth: "900px",
                width: "100%",
                overflow: "auto",
                margin: "0 auto",
              }}
              width={900}
              height={500}
              data={dataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
            <h1
              className="title"
              style={{
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              Lịch sử cược
            </h1>
            <DataGrid
              rows={GridRowsProp}
              columns={GridColDef}
              componentsProps={{
                panel: {
                  sx: {
                    "& .MuiTypography-root": {
                      color: "dodgerblue",
                      fontSize: 20,
                    },
                    "& .MuiDataGrid-filterForm": {
                      bgcolor: "lightblue",
                    },
                  },
                },
              }}
              sx={{
                color: "#000000",
                "& .MuiDataGrid-paper": {
                  color: "#000000",
                },
                "& .MuiToolbar-root": {
                  color: "#000000",
                },
                "& .MuiMenuItem-root": {
                  color: "#000000",
                },
              }}
            />
          </>
        )}
      </Box>
    </>
  );
};
export default LichSuCuoc;
