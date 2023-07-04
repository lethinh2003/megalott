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

const LichSuCuoc = ({ ID }) => {
  const socket = useContext(SocketContext);

  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/keno3p/lich-su-cuoc?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-cuoc-chi-tiet-game-keno-3p", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (socket) {
      socket.emit("join-room-admin-keno3p");
      socket.off("refetchDataLichSuCuocGameKeno3P").on("refetchDataLichSuCuocGameKeno3P", ({ phien }) => {
        if (phien == ID) {
          refetch();
        }
      });
      return () => {
        socket.off("refetchDataLichSuCuocGameKeno3P");
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
      const Cuoc1C = { name: "1C", value: 0 };
      const Cuoc1L = { name: "1L", value: 0 };
      const Cuoc1T = { name: "1T", value: 0 };
      const Cuoc1X = { name: "1X", value: 0 };
      const Cuoc2C = { name: "2C", value: 0 };
      const Cuoc2L = { name: "2L", value: 0 };
      const Cuoc2T = { name: "2T", value: 0 };
      const Cuoc2X = { name: "2X", value: 0 };
      const Cuoc3C = { name: "3C", value: 0 };
      const Cuoc3L = { name: "3L", value: 0 };
      const Cuoc3T = { name: "3T", value: 0 };
      const Cuoc3X = { name: "3X", value: 0 };
      const Cuoc4C = { name: "4C", value: 0 };
      const Cuoc4L = { name: "4L", value: 0 };
      const Cuoc4T = { name: "4T", value: 0 };
      const Cuoc4X = { name: "4X", value: 0 };
      const Cuoc5C = { name: "5C", value: 0 };
      const Cuoc5L = { name: "5L", value: 0 };
      const Cuoc5T = { name: "5T", value: 0 };
      const Cuoc5X = { name: "5X", value: 0 };

      dataQuery.data.map((item) => {
        item.datCuoc.map((itemCuoc) => {
          if (itemCuoc.loaiBi === 1 && itemCuoc.loaiCuoc === "C") {
            Cuoc1C.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 1 && itemCuoc.loaiCuoc === "L") {
            Cuoc1L.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 1 && itemCuoc.loaiCuoc === "T") {
            Cuoc1T.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 1 && itemCuoc.loaiCuoc === "X") {
            Cuoc1X.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 2 && itemCuoc.loaiCuoc === "C") {
            Cuoc2C.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 2 && itemCuoc.loaiCuoc === "L") {
            Cuoc2L.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 2 && itemCuoc.loaiCuoc === "T") {
            Cuoc2T.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 2 && itemCuoc.loaiCuoc === "X") {
            Cuoc2X.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 3 && itemCuoc.loaiCuoc === "C") {
            Cuoc3C.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 3 && itemCuoc.loaiCuoc === "L") {
            Cuoc3L.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 3 && itemCuoc.loaiCuoc === "T") {
            Cuoc3T.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 3 && itemCuoc.loaiCuoc === "X") {
            Cuoc3X.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 4 && itemCuoc.loaiCuoc === "C") {
            Cuoc4C.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 4 && itemCuoc.loaiCuoc === "L") {
            Cuoc4L.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 4 && itemCuoc.loaiCuoc === "T") {
            Cuoc4T.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 4 && itemCuoc.loaiCuoc === "X") {
            Cuoc4X.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 5 && itemCuoc.loaiCuoc === "C") {
            Cuoc5C.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 5 && itemCuoc.loaiCuoc === "L") {
            Cuoc5L.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 5 && itemCuoc.loaiCuoc === "T") {
            Cuoc5T.value += itemCuoc.tienCuoc;
          } else if (itemCuoc.loaiBi === 5 && itemCuoc.loaiCuoc === "X") {
            Cuoc5X.value += itemCuoc.tienCuoc;
          }
        });
      });
      tempDataChart.push(
        Cuoc1C,
        Cuoc1L,
        Cuoc1T,
        Cuoc1X,
        Cuoc2C,
        Cuoc2L,
        Cuoc2T,
        Cuoc2X,
        Cuoc3C,
        Cuoc3L,
        Cuoc3T,
        Cuoc3X,
        Cuoc4C,
        Cuoc4L,
        Cuoc4T,
        Cuoc4X,
        Cuoc5C,
        Cuoc5L,
        Cuoc5T,
        Cuoc5X
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
              Bi {item.loaiBi}- {item.loaiCuoc} -{" "}
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
