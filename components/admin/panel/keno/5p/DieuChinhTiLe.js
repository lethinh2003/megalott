import { Backdrop, Box, Button, CircularProgress, FormControl, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../../../context/socket";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../../../custom/textfield";

const DieuChinhTiLe = () => {
  const socket = useContext(SocketContext);

  const [tiLe, setTiLe] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/keno5p/ti-le`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-ti-le-game-keno-5p", callDataApi, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { data: dataQuery, isLoading, isFetching, isError: isErrorQuery, error, refetch } = getListQuery;
  useEffect(() => {
    if (socket) {
      return () => {};
    }
  }, [socket]);
  useEffect(() => {
    if (error && error.response) {
      toast.error(error.response.data.message);
    }
  }, [isErrorQuery]);
  useEffect(() => {
    if (dataQuery && dataQuery.data) {
      setTiLe(dataQuery.data.gameConfigs.kenoConfigs.tiLe5P);
    }
  }, [dataQuery]);
  const handleChangeTiLe = (e) => {
    setTiLe(e.target.value);
  };
  const handleClickDieuChinh = () => {
    const convertNum = Number(tiLe);
    if (convertNum < 0) {
      toast.error("Vui lòng chọn tỉ lệ hợp lệ");
      return;
    }
    setIsLoadingState(true);
    socket.emit("dieu-chinh-ti-le-keno-5p", { tiLe: convertNum }, (callback) => {
      if (callback) {
        setIsLoadingState(false);
        if (callback.status === "error") {
          toast.error("Có lỗi xảy ra khi chỉnh sửa tỉ lệ");
        } else {
          refetch();
          toast.success("Chỉnh sửa thành công");
        }
      }
    });
  };
  return (
    <>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Điều chỉnh tỉ lệ trả thưởng
      </h1>

      <Box
        sx={{
          textAlign: "center",
          color: "text.secondary",
          height: 500,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {isLoadingState && (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoadingState}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {isLoading && <CircularProgress color="inherit" />}

        {!isLoading && (
          <>
            <FormControl fullWidth>
              <Typography>Tỉ lệ</Typography>
              <InputComponent
                placeholder="Tỉ lệ"
                size="small"
                type="number"
                fullWidth
                onChange={handleChangeTiLe}
                value={tiLe}
                sx={{
                  ...rootStyles,
                }}
                InputProps={{
                  sx: {
                    ...rootInputStyles,
                  },
                }}
                inputProps={{
                  sx: {
                    ...inputStyles,
                  },
                }}
              />
            </FormControl>
            <Button
              sx={{
                marginTop: "10px",
              }}
              onClick={handleClickDieuChinh}
            >
              Điều chỉnh
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
export default DieuChinhTiLe;
