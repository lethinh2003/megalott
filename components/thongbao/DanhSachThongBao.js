import { Box } from "@mui/material";
import Item from "./Item";
const DanhSachThongBao = ({ list }) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0,1fr))",
          gap: "2rem",
          marginTop: "10px",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {list && list.map((item) => <Item key={item._id} item={item} />)}
      </Box>
    </>
  );
};
export default DanhSachThongBao;
