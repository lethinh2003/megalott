import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../../custom/textfield";
import convertMoney, { isNumeric } from "../../../../utils/convertMoney";
import LoadingBox from "../../../homePage/LoadingBox";
const BoxContainer = styled(Box)(({ theme }) => ({
  borderRadius: "20px",
  padding: "20px",
  marginTop: "10px",

  backgroundColor: theme.palette.background.default,
  position: "relative",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  color: theme.palette.text.secondary,
  "& .bet_state": {
    borderBottom: "3px solid red",
    display: "inline-block",
    fontWeight: 700,
    margin: "0.1rem 0 0.3rem",
  },
}));
const ItemCuoc = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  padding: "10px",
  cursor: "pointer",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  border: "1px solid #e5e5e5",
  alignItems: "center",
  color: theme.palette.text.secondary,
  "& .loai_cuoc": {
    fontWeight: 700,
    color: "red",
  },
  "& .tien_cuoc": {
    fontWeight: 700,
    color: "#fa8838",
  },
  "&.active-tien_cuoc": {
    backgroundColor: "red",
    "& .loai_cuoc": {
      color: "#ffffff",
    },
  },
}));
const loaiCuoc = [
  {
    tenCuoc: "Chẵn",
    loaiCuoc: "C",
  },
  {
    tenCuoc: "Lẻ",
    loaiCuoc: "L",
  },
  {
    tenCuoc: "Tài",
    loaiCuoc: "T",
  },
  {
    tenCuoc: "Xỉu",
    loaiCuoc: "X",
  },
];
const mucTienCuoc = [10000, 50000, 100000, 500000, 1000000];
const loaiBi = [1, 2, 3, 4, 5];

const DatCuoc = ({ isRunning, phien, status }) => {
  const balance = useSelector((state) => state.balance.balance);
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tienCuoc, setTienCuoc] = useState(0);
  const [tiLe, setTiLe] = useState(0);
  const [chiTietCuocCu, setChiTietCuocCu] = useState([]);
  const [chiTietCuoc, setChiTietCuoc] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && phien !== 0 && !isInit) {
      getDataCuocGame();
    }
  }, [status, phien]);
  useEffect(() => {
    if (!isRunning) {
      setChiTietCuoc([]);
    }
  }, [isRunning]);

  const getDataCuocGame = async () => {
    try {
      setIsLoading(true);
      const results = await axios.get(
        `${process.env.ENDPOINT_SERVER}/api/v1/games/keno1p/lich-su-cuoc-chi-tiet?phien=${phien}`
      );
      const getTile = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno1p/ti-le`);
      if (getTile.data) {
        setTiLe(getTile.data.data.gameConfigs.kenoConfigs.tiLe1P);
      }
      if (results.data) {
        toast.success(results.data.message);
        setIsInit(true);
        setChiTietCuocCu(results.data.data.datCuoc);
        setChiTietCuoc(results.data.data.datCuoc);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleSubmitCuoc = async () => {
    try {
      if (chiTietCuoc.length === 0) {
        toast.error("Vui lòng chọn cược");
        return;
      }
      setIsLoading(true);
      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno1p/dat-cuoc`, {
        phien,
        chiTietCuoc,
      });
      if (results.data) {
        toast.success(results.data.message);
        setTienCuoc(0);
        setChiTietCuocCu(chiTietCuoc);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleClickCuocCLTX = (item, loaiBi) => {
    if (!tienCuoc || tienCuoc <= 0 || !isNumeric(tienCuoc)) {
      toast.error("Vui lòng chọn tiền cược hợp lệ");
      return;
    }

    const findItemCuoc = chiTietCuoc.find((e) => e.loaiCuoc === item.loaiCuoc && e.loaiBi === loaiBi);
    if (!findItemCuoc) {
      const chiTietCuoc = {
        loaiCuoc: item.loaiCuoc,
        loaiBi: loaiBi,
        tienCuoc: parseInt(tienCuoc),
      };

      setChiTietCuoc((state) => [...state, chiTietCuoc]);
    } else {
      const newTienCuoc = findItemCuoc.tienCuoc + parseInt(tienCuoc);
      setChiTietCuoc((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.loaiCuoc === item.loaiCuoc && obj.loaiBi === loaiBi) {
            return { ...obj, tienCuoc: newTienCuoc };
          }
          return obj;
        });
        return newState;
      });
    }
  };
  const convertTienCuocCLTX = (item, loaiBi) => {
    const findItemCuoc = chiTietCuoc.find((e) => e.loaiCuoc === item.loaiCuoc && e.loaiBi === loaiBi);
    if (findItemCuoc) {
      return convertMoney(findItemCuoc.tienCuoc);
    } else {
      return 0;
    }
  };

  const handleClickResetCuoc = () => {
    setChiTietCuoc(chiTietCuocCu);
    setTienCuoc(0);
  };
  return (
    <>
      <LoadingBox isLoading={isLoading} />
      <BoxContainer>
        <h2 className="title">Đặt cược</h2>

        {loaiBi.map((item, i) => (
          <Box key={i}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Cược bi {item}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                gap: "10px",
              }}
            >
              {loaiCuoc.map((itemLoaiCuoc) => (
                <ItemCuoc key={itemLoaiCuoc.tenCuoc} onClick={() => handleClickCuocCLTX(itemLoaiCuoc, item)}>
                  <Typography className="loai_cuoc">{itemLoaiCuoc.tenCuoc}</Typography>
                  <Typography>x{tiLe}</Typography>
                  <Typography className="tien_cuoc">{convertTienCuocCLTX(itemLoaiCuoc, item)}</Typography>
                </ItemCuoc>
              ))}
            </Box>
          </Box>
        ))}

        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          Chọn tiền cược sẵn có
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          {mucTienCuoc.map((item, i) => (
            <ItemCuoc
              key={item}
              className={tienCuoc == item ? "active-tien_cuoc" : ""}
              onClick={() => setTienCuoc(item)}
            >
              <Typography className="loai_cuoc">{convertMoney(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>

        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          Hoặc nhập số tiền bất kỳ ở dưới
        </Typography>
        <InputComponent
          defaultValue={0}
          value={tienCuoc}
          onChange={(e) => setTienCuoc(e.target.value)}
          placeholder="Số tiền"
          size="small"
          type="number"
          fullWidth
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

        <Button disabled={isRunning} onClick={handleSubmitCuoc}>
          {isRunning ? "Chờ phiên mới" : "Xác nhận"}
        </Button>

        <Button onClick={handleClickResetCuoc}>Đặt lại</Button>
      </BoxContainer>
    </>
  );
};
export default memo(DatCuoc);
