import InfoIcon from "@mui/icons-material/Info";
import { Box, Breadcrumbs, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../../utils/convertTime";
import convertTinhTrang from "../../../../utils/convertTinhTrang";
const RutTien = () => {
  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/rut-tien`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-danh-sach-rut-tien", callDataApi, {
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
        taiKhoan: item.nguoiDung.taiKhoan,
        noiDung: item.noiDung,
        soTien: item.soTien,
        tinhTrang: item.tinhTrang,
        nganHang: `${item.nganHang.tenNganHang} - ${item.nganHang.soTaiKhoan} - ${item.nganHang.tenChuTaiKhoan}`,
        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "taiKhoan", headerName: "Tài khoản", width: 150 },
    {
      field: "soTien",
      headerName: "Số tiền",
      width: 150,
      renderCell: (params) => {
        return (
          <NumericFormat value={params.value} displayType="text" allowLeadingZeros thousandSeparator="," suffix="đ" />
        );
      },
    },
    {
      field: "nganHang",
      headerName: "Ngân hàng",
      width: 250,
    },
    {
      field: "noiDung",
      headerName: "Nội dung",
      width: 250,
    },
    {
      field: "tinhTrang",
      headerName: "Tình trạng",
      width: 150,
      renderCell: (params) => {
        return convertTinhTrang(params.value);
      },
    },

    { field: "createdAt", headerName: "Thời gian tạo", width: 150 },

    {
      field: "action",
      headerName: "Thao tác",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <Link href={`/admin/settings/ruttien/${params.id}`} label="Info">
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
        <Typography>Yêu cầu rút tiền</Typography>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Danh sách yêu cầu rút tiền
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
export default RutTien;
