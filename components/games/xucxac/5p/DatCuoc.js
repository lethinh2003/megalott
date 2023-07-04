import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useEffect, useState } from "react";
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
const DatCuoc = ({ isRunning, phien, status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [tienCuoc, setTienCuoc] = useState(0);
  const [tiLe, setTiLe] = useState({
    tiLeCLTX: 0,
    tiLe2SoBatKy: 0,
    tiLe2So: 0,
    tiLe3SoBatKy: 0,
    tiLe3So: 0,
  });
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
        `${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac5p/lich-su-cuoc-chi-tiet?phien=${phien}`
      );
      const getTile = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac5p/ti-le`);
      if (getTile.data) {
        setTiLe({
          tiLeCLTX: getTile.data.data.gameConfigs.xucXacConfigs.xucXac5P.tiLeCLTX,
          tiLe2SoBatKy: getTile.data.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe2SoBatKy,
          tiLe2So: getTile.data.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe2So,
          tiLe3SoBatKy: getTile.data.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe3SoBatKy,
          tiLe3So: getTile.data.data.gameConfigs.xucXacConfigs.xucXac5P.tiLe3So,
        });
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

      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac5p/dat-cuoc`, {
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

  const cuocTruyenThong = [
    {
      tenCuoc: "Chẵn",
      loaiCuoc: "C",
      base: "CLTX",
    },
    {
      tenCuoc: "Lẻ",
      loaiCuoc: "L",
      base: "CLTX",
    },
    {
      tenCuoc: "Tài",
      loaiCuoc: "T",
      base: "CLTX",
    },
    {
      tenCuoc: "Xỉu",
      loaiCuoc: "X",
      base: "CLTX",
    },
  ];
  const cuoc2So = [
    {
      loaiCuoc: "11",
      base: "2SO",
    },
    {
      loaiCuoc: "22",
      base: "2SO",
    },
    {
      loaiCuoc: "33",
      base: "2SO",
    },
    {
      loaiCuoc: "44",
      base: "2SO",
    },
    {
      loaiCuoc: "55",
      base: "2SO",
    },
    {
      loaiCuoc: "66",
      base: "2SO",
    },
  ];
  const cuoc3So = [
    {
      loaiCuoc: "111",
      base: "3SO",
    },
    {
      loaiCuoc: "222",
      base: "3SO",
    },
    {
      loaiCuoc: "333",
      base: "3SO",
    },
    {
      loaiCuoc: "444",
      base: "3SO",
    },
    {
      loaiCuoc: "555",
      base: "3SO",
    },
    {
      loaiCuoc: "666",
      base: "3SO",
    },
  ];
  const mucTienCuoc = [10000, 50000, 100000, 500000, 1000000];

  const handleClickCuocCLTX = (item) => {
    if (!tienCuoc || tienCuoc <= 0 || !isNumeric(tienCuoc)) {
      toast.error("Vui lòng chọn tiền cược hợp lệ");
      return;
    }

    const findItemCuoc = chiTietCuoc.find((e) => e.chiTietCuoc === item.loaiCuoc && e.loaiCuoc === item.base);
    if (!findItemCuoc) {
      const chiTietCuoc = {
        loaiCuoc: item.base,
        chiTietCuoc: item.loaiCuoc,
        tienCuoc: parseInt(tienCuoc),
      };
      setChiTietCuoc((state) => [...state, chiTietCuoc]);
    } else {
      const newTienCuoc = findItemCuoc.tienCuoc + parseInt(tienCuoc);
      setChiTietCuoc((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.chiTietCuoc === item.loaiCuoc && obj.loaiCuoc === item.base) {
            return { ...obj, tienCuoc: newTienCuoc };
          }
          return obj;
        });
        return newState;
      });
    }
  };

  const convertTienCuocCLTX = (item) => {
    const findItemCuoc = chiTietCuoc.find((e) => e.chiTietCuoc === item.loaiCuoc && e.loaiCuoc === item.base);
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "10px",
          }}
        >
          {cuocTruyenThong.map((item, i) => (
            <ItemCuoc key={item.tenCuoc} onClick={() => handleClickCuocCLTX(item)}>
              <Typography className="loai_cuoc">{item.tenCuoc}</Typography>
              <Typography>x{tiLe.tiLeCLTX}</Typography>
              <Typography className={"tien_cuoc"}>{convertTienCuocCLTX(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>
        <ItemCuoc
          onClick={() =>
            handleClickCuocCLTX({
              loaiCuoc: "batky",
              base: "2SO",
            })
          }
        >
          <Typography className="loai_cuoc">2 số trùng bất kỳ</Typography>
          <Typography>x{tiLe.tiLe2SoBatKy}</Typography>
          <Typography className="tien_cuoc">
            {convertTienCuocCLTX({
              loaiCuoc: "batky",
              base: "2SO",
            })}
          </Typography>
        </ItemCuoc>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "10px",
          }}
        >
          {cuoc2So.map((item, i) => (
            <ItemCuoc key={item.loaiCuoc} onClick={() => handleClickCuocCLTX(item)}>
              <Typography className="loai_cuoc">{item.loaiCuoc}</Typography>
              <Typography>x{tiLe.tiLe2So}</Typography>
              <Typography className="tien_cuoc">{convertTienCuocCLTX(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>
        <ItemCuoc
          onClick={() =>
            handleClickCuocCLTX({
              loaiCuoc: "batky",
              base: "3SO",
            })
          }
        >
          <Typography className="loai_cuoc">3 số trùng bất kỳ</Typography>
          <Typography>x{tiLe.tiLe3SoBatKy}</Typography>
          <Typography className="tien_cuoc">
            {convertTienCuocCLTX({
              loaiCuoc: "batky",
              base: "3SO",
            })}
          </Typography>
        </ItemCuoc>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "10px",
          }}
        >
          {cuoc3So.map((item, i) => (
            <ItemCuoc key={item.loaiCuoc} onClick={() => handleClickCuocCLTX(item)}>
              <Typography className="loai_cuoc">{item.loaiCuoc}</Typography>
              <Typography>x{tiLe.tiLe3So}</Typography>
              <Typography className="tien_cuoc">{convertTienCuocCLTX(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>
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
