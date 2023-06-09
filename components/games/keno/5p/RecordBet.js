import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../../../context/socket";
import BoxInfor from "../BoxInfor";
import BoxQuay from "../BoxQuay";
import DatCuoc from "./DatCuoc";
const RecordBet = () => {
  const { data: session, status } = useSession();
  const [countdownTime, setCountdownTime] = useState(null);
  const [phien, setPhien] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [isResetGame, setIsResetGame] = useState(false);
  const [ketQuaRandom, setKetQuaRandom] = useState([]);
  const [phienHoanTatMoiNhat, setPhienHoanTatMoiNhat] = useState({});
  let countdownTimeRef = useRef();
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket && status === "authenticated") {
      socket.emit("join-room-keno5p");
      socket.off("hienThiPhien5P").on("hienThiPhien5P", (data) => {
        setPhien(data.phien);
      });
      socket.off("timer5P").on("timer5P", (data) => {
        setCountdownTime(data.current_time);
      });

      socket.off("running5P").on("running5P", () => {
        setIsRunning(true);
      });
      socket.off("stop5P").on("stop5P", () => {
        setIsRunning(false);
      });
      socket.off("ketqua5P").on("ketqua5P", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });

      socket.off("phienHoanTatMoiNhat5P").on("phienHoanTatMoiNhat5P", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhien5P");
        socket.off("timer5P");
        socket.off("running5P");
        socket.off("stop5P");
        socket.off("ketqua5P");
        socket.off("phienHoanTatMoiNhat5P");
      };
    }
  }, [socket, status]);
  useEffect(() => {
    if (isResetGame && socket) {
      setIsRunning(false);
      setCountdownTime(null);
      setIsResetGame(false);
    }
  }, [isResetGame]);

  return (
    <>
      <Box
        sx={{
          borderRadius: "20px",
          padding: "20px",
          marginTop: "10px",

          backgroundColor: "background.default",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <BoxInfor phien={phien} countdownTime={countdownTime} isModal={isModal} setIsModal={setIsModal} />

        <BoxQuay isRunning={isRunning} ketQuaRandom={ketQuaRandom} phienHoanTatMoiNhat={phienHoanTatMoiNhat}></BoxQuay>
      </Box>
      <DatCuoc isRunning={isRunning} phien={phien} />
    </>
  );
};
export default RecordBet;
