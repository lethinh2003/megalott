import InfoIcon from "@mui/icons-material/Info";
import { Box, Breadcrumbs, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../../utils/convertTime";

const ThongBao = () => {
  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/thong-bao`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-danh-sach-thong-bao", callDataApi, {
    cacheTime: Infinity,
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
        tieuDe: item.tieuDe,
        noiDung: item.noiDung,
        hinhAnh: item.hinhAnh,
        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "tieuDe", headerName: "Tiêu đề", width: 250 },
    {
      field: "hinhAnh",
      headerName: "Hình ảnh",
      width: 250,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            style={{
              width: "100px",
              height: "50px",
              objectFit: "cover",
            }}
          />
        );
      },
    },
    {
      field: "noiDung",
      headerName: "Nội dung",
      width: 250,
      renderCell: (params) => {
        return <div className="content-html" dangerouslySetInnerHTML={{ __html: params.value }} />;
      },
    },

    { field: "createdAt", headerName: "Thời gian tạo", width: 250 },

    {
      field: "action",
      headerName: "Thao tác",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <Link href={`/admin/settings/thongbao/${params.id}`} label="Info">
          <InfoIcon />
        </Link>,
      ],
    },
  ];

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/settings">
          Settings
        </Link>
        <Typography>Thông báo</Typography>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Danh sách thông báo
      </h1>
      <Link href="/admin/settings/thongbao/them">
        <Button>Thêm mới</Button>
      </Link>

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
export default ThongBao;
