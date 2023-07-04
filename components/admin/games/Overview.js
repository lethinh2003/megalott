import { Box, Breadcrumbs, Card, Typography } from "@mui/material";

import Link from "next/link";
const listGame = [
  {
    title: "Keno 1P",
    link: "/admin/games/keno1p",
    icon: "https://i.imgur.com/G8qXjaI.png",
    introduce: "Xem và chỉnh sửa kết quả quay số",
  },
  {
    title: "Keno 3P",
    link: "/admin/games/keno3p",
    icon: "https://i.imgur.com/G8qXjaI.png",
    introduce: "Xem và chỉnh sửa kết quả quay số",
  },
  {
    title: "Keno 5P",
    link: "/admin/games/keno5p",
    icon: "https://i.imgur.com/G8qXjaI.png",
    introduce: "Xem và chỉnh sửa kết quả quay số",
  },
  {
    title: "Xúc Xắc 3P",
    link: "/admin/games/xucxac3p",
    icon: "https://i.imgur.com/Hd9zWRS.png",
    introduce: "Xem và chỉnh sửa kết quả xúc xắc",
  },
  {
    title: "Xúc Xắc 5P",
    link: "/admin/games/xucxac5p",
    icon: "https://i.imgur.com/Hd9zWRS.png",
    introduce: "Xem và chỉnh sửa kết quả xúc xắc",
  },
];

const Overview = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/games">
          Games
        </Link>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Danh sách các game
      </h1>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0,1fr))",

            md: "repeat(2, minmax(0,1fr))",

            lg: "repeat(4, minmax(0,1fr))",
          },
          gap: "20px",
        }}
      >
        {listGame.map((item, i) => (
          <Link href={item.link} key={i}>
            <Card
              sx={{
                cursor: "pointer",
                backgroundColor: "#ffffff",
                color: "#201c58",
                height: "220px",

                display: "flex",

                padding: "20px",

                minWidth: "200px",
                maxWidth: "200px",
                boxShadow: "-1px 2px 14px 5px #edf0f8",
                borderRadius: "30px",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img src={item.icon} style={{ width: "100%" }} />
                </Box>

                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  {item.introduce}
                </Typography>
              </Box>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default Overview;
