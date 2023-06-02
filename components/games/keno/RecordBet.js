import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../../context/socket";
import BoxQuay from "./BoxQuay";
import CountdownTimer from "./CountdownTimer";

const RecordBet = () => {
  const { data: session, status } = useSession();
  const [countdownTime, setCountdownTime] = useState(null);
  const [phien, setPhien] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResetGame, setIsResetGame] = useState(false);
  const [ketQuaRandom, setKetQuaRandom] = useState([]);
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
      socket.off("lichSuGame").on("lichSuGame", ({ lichSuDatCuoc }) => {
        console.log(lichSuDatCuoc);
      });

      return () => {};
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

  useEffect(() => {
    if (countdownTime !== null && countdownTime > 0) {
      countdownTimeRef.current = setInterval(() => {
        setCountdownTime((countdownTime) => countdownTime - 1);
      }, 1000);
    } else {
      clearInterval(countdownTimeRef.current);
    }
    return () => {
      clearInterval(countdownTimeRef.current);
    };
  }, [countdownTime]);
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
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
          setIsResetGame={setIsResetGame}
        ></BoxQuay>
      </Box>
    </>
  );
};
export default RecordBet;
