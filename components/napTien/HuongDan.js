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
        <h2 className="title">Hướng dẫn nạp tiền</h2>
        <Typography component="ul">
          <li>Chuyển khoản đến đúng thông tin ngân hàng ở trên.</li>
          <li>Tiền sẽ tự động vào tài khoản trong vòng 1 phút, nếu thấy lâu có thể liên hệ bộ phận hỗ trợ.</li>
          <li>Không cộng tiền đối với các trường hợp chuyển tiền sai nội dung.</li>
        </Typography>
      </Box>
    </>
  );
};
export default HuongDan;
