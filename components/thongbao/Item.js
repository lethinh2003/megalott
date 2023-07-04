import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Item = ({ item }) => {
  return (
    <>
      <Link href={`/thongbao/${item._id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "7px",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            alignItems: "center",

            color: (theme) => theme.palette.text.secondary,
            boxShadow: "0 0 5px 0 #d5c0c0",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "150px",
            }}
          >
            <img
              src={item.hinhAnh}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {item.tieuDe}
            </Typography>
          </Box>
        </Box>
      </Link>
    </>
  );
};
export default Item;
