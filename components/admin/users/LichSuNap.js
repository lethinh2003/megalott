import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../utils/convertTime";
import convertTinhTrang from "../../../utils/convertTinhTrang";
const LichSuNap = ({ ID }) => {
  const [data, setData] = useState([]);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/users/nap-tien/chi-tiet?id=${ID}`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-lich-su-nap-tien-user", callDataApi, {
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
        maDonHang: item.maDonHang,
        nganHang: item.nganHang,
        soTien: item.soTien,
        tinhTrang: item.tinhTrang,
        noiDung: item.noiDung,

        createdAt: convertDateTime(item.createdAt),
      }));
      setData(newData);
    }
  }, [dataQuery]);

  const GridRowsProp = data;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "maDonHang", headerName: "Mã đơn hàng", width: 200 },
    {
      field: "nganHang",
      headerName: "Ngân hàng",
      width: 250,
    },
    {
      field: "soTien",
      headerName: "Số tiền",
      width: 250,
      renderCell: (params) => {
        return (
          <NumericFormat value={params.value} displayType="text" allowLeadingZeros thousandSeparator="," suffix="đ" />
        );
      },
    },
    {
      field: "tinhTrang",
      headerName: "Tình trạng",
      width: 250,
      renderCell: (params) => {
        return convertTinhTrang(params.value);
      },
    },
    {
      field: "noiDung",
      headerName: "Nội dung",
      width: 250,
    },

    { field: "createdAt", headerName: "Thời gian nạp", width: 250 },
  ];

  return (
    <>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Lịch sử nạp
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
export default LichSuNap;
