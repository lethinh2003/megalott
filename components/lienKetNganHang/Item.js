import { Box, Typography } from "@mui/material";

const Item = ({ item }) => {
  return (
    <>
      <Box
        sx={{
          background: "url(https://i.imgur.com/VGR5WLt.png) no-repeat 50%",
          backgroundSize: "100% 100%",
          padding: "10px",
          minHeight: "200px",
          alignItems: "center",
          gap: "10px",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.8rem",
            }}
          >
            {item.tenChuTaiKhoan}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            {item.soTaiKhoan}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            margin: "20px",
            alignItems: "center",
          }}
        >
          <img src="https://i.imgur.com/LKRkPTe.png" />
          <Typography
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "2.5rem",
            }}
          >
            {item.tenNganHang}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default Item;
