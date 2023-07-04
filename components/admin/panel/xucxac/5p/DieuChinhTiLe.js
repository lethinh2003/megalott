import { Backdrop, Box, Button, CircularProgress, FormControl, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SocketContext from "../../../../../context/socket";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../../../custom/textfield";

const DieuChinhTiLe = () => {
  const socket = useContext(SocketContext);

  const [tiLe, setTiLe] = useState({
    tiLeCLTX: 0,
    tiLe2SoBatKy: 0,
    tiLe2So: 0,
    tiLe3SoBatKy: 0,
    tiLe3So: 0,
  });
  const [isLoadingState, setIsLoadingState] = useState(false);

  const callDataApi = async () => {
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/admin/games/xucxac5p/ti-le`);

    return results.data;
  };
  const getListQuery = useQuery("get-admin-ti-le-game-xucxac-5p", callDataApi, {
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
      setTiLe({
        tiLeCLTX: dataQuery.data.gameConfigs.xucXacConfigs.xucXac5P.tiLeCLTX,
        tiLe2SoBatKy: dataQuery.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe2SoBatKy,
        tiLe2So: dataQuery.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe2So,
        tiLe3SoBatKy: dataQuery.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe3SoBatKy,
        tiLe3So: dataQuery.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe3So,
      });
    }
  }, [dataQuery]);

  const handleClickDieuChinh = () => {
    for (let item in tiLe) {
      tiLe[item] = Number(tiLe[item]);
      if (tiLe[item] <= 0) {
        toast.error("Vui lòng chọn tỉ lệ hợp lệ");
        return;
      }
    }
    setIsLoadingState(true);
    socket.emit("dieu-chinh-ti-le-xucxac-5p", { tiLe: tiLe }, (callback) => {
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
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
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
              <Typography>Tỉ lệ CLTX</Typography>
              <InputComponent
                placeholder="Tỉ lệ CLTX"
                size="small"
                type="number"
                fullWidth
                onChange={(e) => setTiLe((state) => ({ ...state, tiLeCLTX: e.target.value }))}
                value={tiLe.tiLeCLTX}
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
            <FormControl fullWidth>
              <Typography>Tỉ lệ 2 số bất kỳ</Typography>
              <InputComponent
                placeholder="Tỉ lệ 2 số bất kỳ"
                size="small"
                type="number"
                fullWidth
                onChange={(e) => setTiLe((state) => ({ ...state, tiLe2SoBatKy: e.target.value }))}
                value={tiLe.tiLe2SoBatKy}
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
            <FormControl fullWidth>
              <Typography>Tỉ lệ 2 số</Typography>
              <InputComponent
                placeholder="Tỉ lệ 2 số"
                size="small"
                type="number"
                fullWidth
                onChange={(e) => setTiLe((state) => ({ ...state, tiLe2So: e.target.value }))}
                value={tiLe.tiLe2So}
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
            <FormControl fullWidth>
              <Typography>Tỉ lệ 3 số bất kỳ</Typography>
              <InputComponent
                placeholder="Tỉ lệ 3 số bất kỳ"
                size="small"
                type="number"
                fullWidth
                onChange={(e) => setTiLe((state) => ({ ...state, tiLe3SoBatKy: e.target.value }))}
                value={tiLe.tiLe3SoBatKy}
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
            <FormControl fullWidth>
              <Typography>Tỉ lệ 3 số</Typography>
              <InputComponent
                placeholder="Tỉ lệ 3 số"
                size="small"
                type="number"
                fullWidth
                onChange={(e) => setTiLe((state) => ({ ...state, tiLe3So: e.target.value }))}
                value={tiLe.tiLe3So}
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
            <Box>
              <Button
                sx={{
                  marginTop: "10px",
                }}
                onClick={handleClickDieuChinh}
              >
                Điều chỉnh
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
export default DieuChinhTiLe;
