import { Box, Typography } from "@mui/material";

const HuongDan = () => {
  return (
    <>
      <Box
        className="huongdan"
        sx={{
          padding: "10px",
          boxShadow: "0 5px 5px #c5c5da40",
          marginTop: "20px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Typography className="title">Hướng dẫn rút tiền</Typography>
        <Typography component="ul">
          <li>Nhập số tiền và chọn ngân hàng muốn rút.</li>
          <li>Tiền sẽ tự động vào tài khoản trong vòng 1 phút, nếu thấy lâu có thể liên hệ bộ phận hỗ trợ.</li>
        </Typography>
      </Box>
    </>
  );
};
export default HuongDan;
