import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
const LoaiBiInput = ({ ballSelected, setBallSelected }) => {
  const BoxBiContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    "& .redball": {
      backgroundColor: "#e8e7e8",
      color: "#000000",
      cursor: "pointer",
      "&.selected": {
        backgroundColor: "red",
        color: "#ffffff",
      },
    },
  }));
  return (
    <>
      <Typography>Chọn bi</Typography>
      <BoxBiContainer>
        {Array.from({ length: 5 }).map((item, i) => (
          <Box
            onClick={() => setBallSelected(i + 1)}
            key={i}
            className={ballSelected === i + 1 ? "redball selected" : "redball"}
          >
            {i + 1}
          </Box>
        ))}
      </BoxBiContainer>
    </>
  );
};
export default memo(LoaiBiInput);
