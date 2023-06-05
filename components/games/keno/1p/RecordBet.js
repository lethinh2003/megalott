import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../../../context/socket";
import BoxQuay from "../BoxQuay";
import CountdownTimer from "../CountdownTimer";
import DatCuoc from "./DatCuoc";
const RecordBet = () => {
  const { data: session, status } = useSession();
  const [countdownTime, setCountdownTime] = useState(null);
  const [phien, setPhien] = useState(0);
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

      socket.off("running").on("running", () => {
        setIsRunning(true);
      });
      socket.off("ketqua").on("ketqua", ({ ketQuaRandom }) => {
        setKetQuaRandom(ketQuaRandom);
      });

      socket.off("phienHoanTatMoiNhat").on("phienHoanTatMoiNhat", ({ phienHoanTatMoiNhat }) => {
        setPhienHoanTatMoiNhat(phienHoanTatMoiNhat);
      });

      return () => {
        socket.off("hienThiPhien");
        socket.off("timer");
        socket.off("running");
        socket.off("ketqua");
        socket.off("phienHoanTatMoiNhat");
      };
    }
  }, [socket, status]);
  useEffect(() => {
    if (isResetGame && socket) {
      socket.emit("roundstart");
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
        <Box
          sx={{
            display: "flex",

            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",

              padding: "0px 20px",
            }}
          >
            <Typography
              sx={{
                color: "#b7b7b7",
                fontSize: "1.8rem",
              }}
            >
              Phiên số
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              {phien}
            </Typography>
            <Button>Hướng dẫn cách chơi</Button>
          </Box>
          <Box
            sx={{
              textAlign: "center",

              padding: "0px 20px",
            }}
          >
            <Typography
              sx={{
                color: "#b7b7b7",
                fontSize: "1.8rem",
              }}
            >
              Thời gian còn lại
            </Typography>
            <CountdownTimer countdownTime={countdownTime} />
          </Box>
        </Box>
        <BoxQuay
          isRunning={isRunning}
          ketQuaRandom={ketQuaRandom}
          setIsResetGame={setIsResetGame}
          phienHoanTatMoiNhat={phienHoanTatMoiNhat}
        ></BoxQuay>
      </Box>
      <DatCuoc isRunning={isRunning} phien={phien} />
    </>
  );
};
export default RecordBet;