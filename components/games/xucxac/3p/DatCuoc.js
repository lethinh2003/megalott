import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import convertMoney from "../../../../utils/convertMoney";
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
  const balance = useSelector((state) => state.balance.balance);

  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [tienCuoc, setTienCuoc] = useState(0);
  const [loaiCuocSelected, setLoaiCuocSelected] = useState("");
  const [loaiCuoc, setLoaiCuoc] = useState("");
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
        `${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p/lich-su-cuoc-chi-tiet?phien=${phien}`
      );
      if (results.data) {
        toast.success(results.data.message);
        setIsInit(true);
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
      const tongTienCuoc = chiTietCuoc.reduce((a, b) => a + b.tienCuoc, 0);
      console.log(tongTienCuoc);

      if (balance < tongTienCuoc) {
        toast.error("Không đủ tiền cược");
        return;
      }
      setIsLoading(true);

      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/games/xucxac3p/dat-cuoc`, {
        phien,
        chiTietCuoc,
      });
      if (results.data) {
        toast.success(results.data.message);
        setTienCuoc(0);
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
      loaiCuoc: 11,
      base: "2SO",
    },
    {
      loaiCuoc: 22,
      base: "2SO",
    },
    {
      loaiCuoc: 33,
      base: "2SO",
    },
    {
      loaiCuoc: 44,
      base: "2SO",
    },
    {
      loaiCuoc: 55,
      base: "2SO",
    },
    {
      loaiCuoc: 66,
      base: "2SO",
    },
  ];
  const cuoc3So = [
    {
      loaiCuoc: 111,
      base: "3SO",
    },
    {
      loaiCuoc: 222,
      base: "3SO",
    },
    {
      loaiCuoc: 333,
      base: "3SO",
    },
    {
      loaiCuoc: 444,
      base: "3SO",
    },
    {
      loaiCuoc: 555,
      base: "3SO",
    },
    {
      loaiCuoc: 666,
      base: "3SO",
    },
  ];
  const mucTienCuoc = [10000, 50000, 100000, 500000, 1000000];
  useEffect(() => {
    console.log(chiTietCuoc);
  }, [chiTietCuoc]);
  const handleClickCuocCLTX = (item) => {
    if (!tienCuoc) {
      toast.error("Vui lòng chọn tiền cược");
      return;
    }
    const findItemCuoc = chiTietCuoc.find((e) => e.chiTietCuoc === item.loaiCuoc && e.loaiCuoc === item.base);
    if (!findItemCuoc) {
      const chiTietCuoc = {
        loaiCuoc: item.base,
        chiTietCuoc: item.loaiCuoc,
        tienCuoc: tienCuoc,
      };
      setChiTietCuoc((state) => [...state, chiTietCuoc]);
    } else {
      const newTienCuoc = findItemCuoc.tienCuoc + tienCuoc;
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
              <Typography>x1.98</Typography>
              <Typography className="tien_cuoc">{convertTienCuocCLTX(item)}</Typography>
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
          <Typography>x3</Typography>
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
              <Typography>x4</Typography>
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
          <Typography>x6</Typography>
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
              <Typography>x7</Typography>
              <Typography className="tien_cuoc">{convertTienCuocCLTX(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>
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
              className={tienCuoc === item ? "active-tien_cuoc" : ""}
              onClick={() => setTienCuoc(item)}
            >
              <Typography className="loai_cuoc">{convertMoney(item)}</Typography>
            </ItemCuoc>
          ))}
        </Box>

        <Button disabled={isRunning} onClick={handleSubmitCuoc}>
          {isRunning ? "Chờ phiên mới" : "Xác nhận"}
        </Button>
      </BoxContainer>
    </>
  );
};
export default memo(DatCuoc);
