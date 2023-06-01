import { Box, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { convertDateTime } from "../../utils/convertTime";

const ItemLichSu = ({ item }) => {
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          flexDirection: "column",

          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#b7b7b7",
            fontSize: "1.3rem",
          }}
        >
          Tiển trước:{" "}
          <NumericFormat value={item.tienTruoc} displayType="text" allowLeadingZeros thousandSeparator="," />đ
        </Typography>
        <Typography
          sx={{
            color: "#b7b7b7",
            fontSize: "1.3rem",
          }}
        >
          Tiền sau: <NumericFormat value={item.tienSau} displayType="text" allowLeadingZeros thousandSeparator="," />đ
        </Typography>
        <Typography
          sx={{
            color: "#b7b7b7",
            fontSize: "1.3rem",
          }}
        >
          Nội dung: {item.noiDung}
        </Typography>

        <Typography
          sx={{
            color: "#b7b7b7",
            fontSize: "1.3rem",
          }}
        >
          {convertDateTime(item.createdAt)}
        </Typography>
      </Box>
    </>
  );
};
export default ItemLichSu;
