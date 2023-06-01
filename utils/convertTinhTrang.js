import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StatusButton = styled(Box)(({ theme }) => ({
  padding: "2px 5px",
  borderRadius: "5px",
  display: "inline-block",
  "& p": {
    color: theme.palette.text.primary,
  },
}));

const convertTinhTrang = (tinhTrang) => {
  if (tinhTrang === "dangCho") {
    return (
      <StatusButton
        sx={{
          backgroundColor: "#ffc200",
        }}
      >
        <Typography>Đang chờ</Typography>
      </StatusButton>
    );
  }
  if (tinhTrang === "hoanTat") {
    return (
      <StatusButton
        sx={{
          backgroundColor: "#6fe26f",
        }}
      >
        <Typography>Hoàn tất</Typography>
      </StatusButton>
    );
  }
  if (tinhTrang === "daHuy") {
    return (
      <StatusButton
        sx={{
          backgroundColor: "#b12424",
        }}
      >
        <Typography>Đã hủy</Typography>
      </StatusButton>
    );
  }
};
export default convertTinhTrang;
