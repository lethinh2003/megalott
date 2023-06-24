import { Box, Breadcrumbs, Card, Typography } from "@mui/material";

import Link from "next/link";
const listGame = [
  { title: "Keno 1P", link: "/admin/games/keno1p", icon: "https://i.imgur.com/G8qXjaI.png" },
  { title: "Keno 3P", link: "/admin/games/keno3p", icon: "https://i.imgur.com/G8qXjaI.png" },
  { title: "Keno 5P", link: "/admin/games/keno5p", icon: "https://i.imgur.com/G8qXjaI.png" },
  { title: "Xúc Xắc 3P", link: "/admin/games/xucxac3p", icon: "https://i.imgur.com/Hd9zWRS.png" },
  { title: "Xúc Xắc 5P", link: "/admin/games/xucxac5p", icon: "https://i.imgur.com/Hd9zWRS.png" },
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
      <Typography component="h1" className="title">
        Danh sách các game
      </Typography>
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
                backgroundColor: "rgb(141 136 136)",
                color: "#ffffff",
                height: "220px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "200px",
              }}
            >
              <Typography
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: "60px",
                    height: "60px",
                    color: "#ffffff",
                    padding: "5px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={item.icon} />
                </Box>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Typography>
              </Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default Overview;
