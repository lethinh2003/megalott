import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingBox from "../../../homePage/LoadingBox";
import LoaiBiInput from "../LoaiBiInput";
import LoaiCuocInput from "../LoaiCuocInput";
import MoneyInput from "../MoneyInput";
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
const DatCuoc = ({ isRunning, phien }) => {
  const balance = useSelector((state) => state.balance.balance);

  const [isLoading, setIsLoading] = useState(false);
  const [ballSelected, setBallSelected] = useState(0);
  const [tienCuoc, setTienCuoc] = useState(0);
  const [loaiCuocSelected, setLoaiCuocSelected] = useState("");

  const handleSubmitCuoc = async () => {
    try {
      if (!ballSelected || !loaiCuocSelected || !tienCuoc) {
        toast.error("Vui lòng chọn đầy đủ các mục");
        return;
      }
      if (isNaN(tienCuoc) === true) {
        toast.error("Vui lòng chọn tiền cược hợp lệ");
        return;
      }
      if (isNaN(tienCuoc) === false && parseInt(tienCuoc) <= 0) {
        toast.error("Vui lòng chọn tiền cược hợp lệ");
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
      const results = await axios.post(`${process.env.ENDPOINT_SERVER}/api/v1/games/keno5p/dat-cuoc`, {
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
        <h2 className="title">Đặt cược</h2>
        <LoaiBiInput ballSelected={ballSelected} setBallSelected={setBallSelected} />

        <LoaiCuocInput loaiCuocSelected={loaiCuocSelected} setLoaiCuocSelected={setLoaiCuocSelected} />

        <MoneyInput tienCuoc={tienCuoc} setTienCuoc={setTienCuoc} />

        <Button disabled={isRunning} onClick={handleSubmitCuoc}>
          {isRunning ? "Chờ phiên mới" : "Đặt cược"}
        </Button>
      </BoxContainer>
    </>
  );
};
export default memo(DatCuoc);
