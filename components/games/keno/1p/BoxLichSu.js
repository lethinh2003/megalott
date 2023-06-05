import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, useState } from "react";
import LichSuCuoc from "./LichSuCuoc";
import LichSuGame from "./LichSuGame";
const BoxLichSu = () => {
  const [tabPage, setTabPage] = useState("lichSuGame");
  const ButtonTabChange = styled(Box)(({ theme }) => ({
    display: "flex",
    backgroundColor: "#e8e7e8",
    color: "#000",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.5rem",
    padding: "10px",
    width: "50%",
    justifyContent: "center",
    "&.active": {
      backgroundColor: "#ff0000",
      color: "#fff",
      boxShadow: "0 0 16px rgba(0,0,0,.25)",
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          margin: "20px",
        }}
      >
        <ButtonTabChange
          onClick={() => setTabPage("lichSuGame")}
          className={tabPage === "lichSuGame" ? "active" : null}
        >
          Lịch sử trò chơi
        </ButtonTabChange>
        <ButtonTabChange
          onClick={() => setTabPage("lichSuCuoc")}
          className={tabPage === "lichSuCuoc" ? "active" : null}
        >
          Lịch sử của tôi
        </ButtonTabChange>
      </Box>
      {tabPage === "lichSuCuoc" && <LichSuCuoc />}
      {tabPage === "lichSuGame" && <LichSuGame />}
    </>
  );
};
export default memo(BoxLichSu);
