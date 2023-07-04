import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../utils/convertTime";

const DanhSachNganHang = ({ ID }) => {
  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/users/ngan-hang/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-danh-sach-ngan-hang-user", callDataApi, {
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
        tenNganHang: item.tenNganHang,
        soTaiKhoan: item.soTaiKhoan,
        tenChuTaiKhoan: item.tenChuTaiKhoan,

        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "tenNganHang", headerName: "Tên ngân hàng", width: 200 },
    {
      field: "soTaiKhoan",
      headerName: "STK",
      width: 250,
    },
    { field: "tenChuTaiKhoan", headerName: "Chủ tài khoản", width: 250 },

    { field: "createdAt", headerName: "Thời gian tạo", width: 250 },
  ];

  return (
    <>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Danh sách ngân hàng
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
export default DanhSachNganHang;
