import { Box, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import convertToTime from "../../../utils/convertTime";
import { useQuery } from "react-query";
const Users = () => {
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/users`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-users", callDataApi, {
    cacheTime: Infinity, //Thời gian cache data, ví dụ: 5000, sau 5s thì cache sẽ bị xóa, khi đó data trong cache sẽ là undefined
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);
  useEffect(() => {
    if (dataQuery && dataQuery.data.length > 0) {
      const newData = dataQuery.data.map((item, i) => ({
        id: item._id,
        stt: i + 1,
        account: item.account,
        name: item.name,
        time: convertToTime(item.createdAt),
        role: item.role,
        status: item.status,
      }));
      setUsers(newData);
    }
  }, [dataQuery]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const results = await axios.get("/api/admin/users");
        const data = results.data.data;
        setIsLoading(false);
        if (data.length > 0) {
          const newData = data.map((item, i) => ({
            id: item._id,
            stt: i + 1,
            account: item.account,
            name: item.name,
            time: convertToTime(item.createdAt),
            role: item.role,
            status: item.status,
          }));
          setUsers(newData);
        }
      } catch (err) {
        setIsLoading(false);

        console.log(err);
      }
    };

    // getUsers();
  }, []);

  const GridRowsProp = users;

  const GridColDef = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "account", headerName: "Account", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "id", headerName: "ID", width: 270 },
    { field: "time", headerName: "Tham gia", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", type: "boolean", width: 150 },
  ];

  return (
    <>
      <Typography
        component="h1"
        className="title"
        sx={{ fontFamily: "Bebas Neue", fontSize: "40px", fontWeight: "bold" }}
      >
        Users
      </Typography>
      <div style={{ height: 500, width: "100%" }}>
        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((item, i) => (
              <Box key={i} sx={{ marginTop: "10px" }}>
                <Skeleton variant="rectangular" height={50} />
              </Box>
            ))}
          </>
        )}
        {!isLoading && <DataGrid rows={GridRowsProp} columns={GridColDef} />}
      </div>
    </>
  );
};
export default Users;
