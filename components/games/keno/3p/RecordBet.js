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
      socket.emit("join-room-keno3p");
      socket.off("hienThiPhien3P").on("hienThiPhien3P", (data) => {
        setPhien(data.phien);
      });
      socket.off("timer3P").on("timer3P", (data) => {
        setCountdownTime(data.current_time);
      });

      socket.off("running3P").on("running3P", () => {
        setIsRunning(true);
      });
      socket.off("stop3P").on("stop3P", () => {
        setIsRunning(false);
      });
      socket.off("ketqua3P").on("ketqua3P", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });

      socket.off("phienHoanTatMoiNhat3P").on("phienHoanTatMoiNhat3P", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhien3P");
        socket.off("timer3P");
        socket.off("running3P");
        socket.off("stop3P");
        socket.off("ketqua3P");
        socket.off("phienHoanTatMoiNhat3P");
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
