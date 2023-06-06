import { Box, Button, Typography } from "@mui/material";
import CountdownTimer from "./CountdownTimer";
import HuongDan from "./HuongDan";

const BoxInfor = ({ phien, setIsModal, countdownTime, isModal }) => {
  return (
    <>
      <HuongDan isModal={isModal} setIsModal={setIsModal} />
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: "10px",
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
          <Button onClick={() => setIsModal(true)}>Hướng dẫn cách chơi</Button>
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
    </>
  );
};
export default BoxInfor;
