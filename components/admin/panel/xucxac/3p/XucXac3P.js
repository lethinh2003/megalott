import InfoIcon from "@mui/icons-material/Info";
import { Box, Breadcrumbs, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../../../context/socket";
import { convertDateTime } from "../../../../../utils/convertTime";

const XucXac3P = () => {
  const socket = useContext(SocketContext);

  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/xucxac3p`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-game-xuc-xac-3p", callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (socket) {
      socket.emit("join-room-admin-xucxac3p");
      socket.off("refetchDataGame").on("refetchDataGame", () => {
        refetch();
      });
      return () => {
        socket.off("refetchDataGame");
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
      const newData = dataQuery.data.map((item, i) => ({
        id: item._id,
        action: item._id,
        stt: i + 1,
        phien: item.phien,
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
    { field: "phien", headerName: "Phiên", width: 100 },
    { field: "ketQua", headerName: "Kết quả", width: 250 },
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
    {
      field: "action",
      headerName: "Thao tác",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <Link href={`/admin/games/xucxac3p/${params.id}`} label="Info">
          <InfoIcon />
        </Link>,
      ],
    },
  ];

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
      </Breadcrumbs>
      <h1 className="title">Xúc Xắc 3P</h1>

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
        {isLoading && <CircularProgress color="inherit" />}

        {!isLoading && (
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
        )}
      </Box>
    </>
  );
};
export default XucXac3P;
