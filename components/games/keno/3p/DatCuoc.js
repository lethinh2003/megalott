import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingBox from "../../../homePage/LoadingBox";
const DatCuoc = ({ isRunning, phien }) => {
  const balance = useSelector((state) => state.balance.balance);

  const [isLoading, setIsLoading] = useState(false);
  const [ballSelected, setBallSelected] = useState(0);
  const [tienCuoc, setTienCuoc] = useState(0);
  const [loaiCuocSelected, setLoaiCuocSelected] = useState("");

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
  const BoxBiContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    "& .redball": {
      backgroundColor: "#e8e7e8",
      color: "#000000",
      cursor: "pointer",
      "&.selected": {
        backgroundColor: "red",
        color: "#ffffff",
      },
    },
  }));
  const BoxTienCuocContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0,1fr))",
    gap: "10px",
    "& .redball": {
      borderRadius: "10px",
      width: "unset",

      backgroundColor: "#e8e7e8",
      color: "#000000",
      cursor: "pointer",
      height: "unset",
      "&.selected": {
        backgroundColor: "red",
        color: "#ffffff",
      },
    },
  }));
  const loaiCuoc = ["T", "X", "C", "L"];
  const loaiTienCuoc = [10000, 20000, 50000, 100000, 500000, 1000000];

  const handleSubmitCuoc = async () => {
    try {
      if (!ballSelected || !loaiCuocSelected || !tienCuoc) {
        toast.error("Vui lòng chọn đầy đủ các mục");
        return;
      }
      if (balance < tienCuoc) {
        toast.error("Không đủ tiền cược");
        return;
      }
      setIsLoading(true);
      const datCuoc = {
        loaiBi: ballSelected,
        loaiCuoc: loaiCuocSelected,
        tienCuoc: tienCuoc,
      };
      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno3p/dat-cuoc`, {
        phien,
        datCuoc,
      });
      if (results.data) {
        toast.success(results.data.message);
        setLoaiCuocSelected("");
        setTienCuoc(0);
        setBallSelected(0);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <>
      <LoadingBox isLoading={isLoading} />
      <BoxContainer>
        <Typography className="title">Đặt cược</Typography>

        <Typography>Chọn bi</Typography>
        <BoxBiContainer>
          {Array.from({ length: 5 }).map((item, i) => (
            <Box
              onClick={() => setBallSelected(i + 1)}
              key={i}
              className={ballSelected === i + 1 ? "redball selected" : "redball"}
            >
              {i + 1}
            </Box>
          ))}
        </BoxBiContainer>
        <Typography>Chọn loại cược</Typography>
        <BoxBiContainer>
          {loaiCuoc.map((item, i) => (
            <Box
              onClick={() => setLoaiCuocSelected(item)}
              key={i}
              className={loaiCuocSelected === item ? "redball selected" : "redball"}
            >
              {item}
            </Box>
          ))}
        </BoxBiContainer>
        <Typography>Chọn tiền cược</Typography>
        <BoxTienCuocContainer
          sx={{
            gridTemplateColumns: { xs: "repeat(3, minmax(0,1fr))", md: "repeat(5, minmax(0,1fr))" },
          }}
        >
          {loaiTienCuoc.map((item, i) => (
            <Box
              onClick={() => setTienCuoc(item)}
              key={i}
              className={tienCuoc === item ? "redball selected" : "redball"}
            >
              <NumericFormat value={item} displayType="text" allowLeadingZeros thousandSeparator="," />đ
            </Box>
          ))}
        </BoxTienCuocContainer>

        <Button disabled={isRunning} onClick={handleSubmitCuoc}>
          {isRunning ? "Chờ phiên mới" : "Đặt cược"}
        </Button>
      </BoxContainer>
    </>
  );
};
export default memo(DatCuoc);
