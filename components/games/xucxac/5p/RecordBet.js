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
      socket.emit("join-room-xucxac5p");
      socket.off("hienThiPhienXucXac5P").on("hienThiPhienXucXac5P", (data) => {
        setPhien(data.phien);
      });
      socket.off("timerXucXac5P").on("timerXucXac5P", (data) => {
        setCountdownTime(data.current_time);
      });

      socket.off("runningXucXac5P").on("runningXucXac5P", () => {
        setIsRunning(true);
      });
      socket.off("stopXucXac5P").on("stopXucXac5P", () => {
        setIsRunning(false);
      });
      socket.off("ketquaXucXac5P").on("ketquaXucXac5P", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });

      socket.off("phienHoanTatMoiNhatXucXac5P").on("phienHoanTatMoiNhatXucXac5P", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhienXucXac5P");
        socket.off("timerXucXac5P");
        socket.off("runningXucXac5P");
        socket.off("stopXucXac5P");
        socket.off("ketquaXucXac5P");
        socket.off("phienHoanTatMoiNhatXucXac5P");
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
      <DatCuoc isRunning={isRunning} phien={phien} status={status} />
    </>
  );
};
export default RecordBet;
