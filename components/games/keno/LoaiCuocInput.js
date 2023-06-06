import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
const LoaiCuocInput = ({ loaiCuocSelected, setLoaiCuocSelected }) => {
  const loaiCuoc = ["T", "X", "C", "L"];
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
      <Typography>Chọn loại cược</Typography>
      <BoxBiContainer>
        {loaiCuoc.map((item, i) => (
          <Box
            onClick={() => setLoaiCuocSelected(item)}
            key={i}
            className={loaiCuocSelected === item ? "redball selected" : "redball"}
          >
            {item}
          </Box>
        ))}
      </BoxBiContainer>
    </>
  );
};
export default memo(LoaiCuocInput);
