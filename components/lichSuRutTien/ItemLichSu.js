import { Box, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { convertDateTime } from "../../utils/convertTime";
import convertTinhTrang from "../../utils/convertTinhTrang";

const ItemLichSu = ({ item }) => {
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {item.nganHang?.tenNganHang}
            </Typography>
            {convertTinhTrang(item.tinhTrang)}
          </Box>
          <Typography
            sx={{
              color: "#b7b7b7",
              fontSize: "1.3rem",
            }}
          >
            Mã giao dịch: {item._id}
          </Typography>
          <Typography
            sx={{
              color: "#b7b7b7",
              fontSize: "1.3rem",
            }}
          >
            Thông tin: {item.nganHang?.tenNganHang} - {item.nganHang?.tenChuTaiKhoan} - {item.nganHang?.soTaiKhoan}
          </Typography>
          {item.noiDung && (
            <Typography
              sx={{
                color: "#b7b7b7",
                fontSize: "1.3rem",
              }}
            >
              Nội dung: {item.noiDung}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
          }}
        >
          <Typography>
            <NumericFormat value={item.soTien} displayType="text" allowLeadingZeros thousandSeparator="," />đ
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
      </Box>
    </>
  );
};
export default ItemLichSu;
