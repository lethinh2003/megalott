import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../../../context/socket";
import BoxInfor from "../BoxInfor";
import BoxQuay from "../BoxQuay";
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
      socket.emit("join-room-xucxac3p");
      socket.off("hienThiPhienXucXac3P").on("hienThiPhienXucXac3P", (data) => {
        setPhien(data.phien);
      });
      socket.off("timerXucXac3P").on("timerXucXac3P", (data) => {
        setCountdownTime(data.current_time);
      });

      socket.off("runningXucXac3P").on("runningXucXac3P", () => {
        setIsRunning(true);
      });
      socket.off("stopXucXac3P").on("stopXucXac3P", () => {
        setIsRunning(false);
      });
      socket.off("ketquaXucXac3P").on("ketquaXucXac3P", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });

      socket.off("phienHoanTatMoiNhatXucXac3P").on("phienHoanTatMoiNhatXucXac3P", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhienXucXac3P");
        socket.off("timerXucXac3P");
        socket.off("runningXucXac3P");
        socket.off("stopXucXac3P");
        socket.off("ketquaXucXac3P");
        socket.off("phienHoanTatMoiNhatXucXac3P");
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
    </>
  );
};
export default RecordBet;
