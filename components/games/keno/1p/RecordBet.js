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
      socket.emit("join-room-keno1p");
      socket.off("hienThiPhien").on("hienThiPhien", (data) => {
        setPhien(data.phien);
      });
      socket.off("timer").on("timer", (data) => {
        setCountdownTime(data.current_time);
      });

      socket.off("ketqua").on("ketqua", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });
      socket.off("running").on("running", () => {
        setIsRunning(true);
      });
      socket.off("stop").on("stop", () => {
        setIsRunning(false);
      });
      socket.off("phienHoanTatMoiNhat").on("phienHoanTatMoiNhat", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhien");
        socket.off("timer");
        socket.off("running");
        socket.off("stop");
        socket.off("ketqua");
        socket.off("phienHoanTatMoiNhat");
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
