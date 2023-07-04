import InfoIcon from "@mui/icons-material/Info";
import { Box, Breadcrumbs, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../utils/convertTime";

const Users = () => {
  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/users`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-danh-sach-users", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;

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
        taiKhoan: item.taiKhoan,
        money: item.money,
        role: item.role,

        status: item.status,

        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "taiKhoan", headerName: "Tài khoản", width: 100 },
    {
      field: "money",
      headerName: "Money",
      width: 250,
      renderCell: (params) => {
        return (
          <NumericFormat value={params.value} displayType="text" allowLeadingZeros thousandSeparator="," suffix="đ" />
        );
      },
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 250,
      renderCell: (params) => {
        if (params.value === true) {
          return (
            <Typography
              sx={{
                color: "green",
                fontSize: "1.3125rem",
              }}
            >
              Đang sử dụng
            </Typography>
          );
        } else if (params.value === false) {
          return (
            <Typography
              sx={{
                color: "red",
                fontSize: "1.3125rem",
              }}
            >
              Ngưng sử dụng
            </Typography>
          );
        }
      },
    },
    { field: "createdAt", headerName: "Thời gian tạo", width: 250 },
    { field: "role", headerName: "Role", width: 250 },

    {
      field: "action",
      headerName: "Thao tác",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <Link href={`/admin/users/${params.id}`} label="Info">
          <InfoIcon />
        </Link>,
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Quản lý người dùng - Trang quản trị Admin</title>
      </Head>

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/users">
          Users
        </Link>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Danh sách người dùng
      </h1>

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
export default Users;
