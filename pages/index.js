import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Layout from "../components/Layout";
const listGame = [
  {
    title: "Keno1P",
    desc: "Đoán số để dành chiến thắng",
    img: "https://i.imgur.com/x6zOE0C.png",
    link: "/games/keno1p",
  },
  {
    title: "Keno3P",
    desc: "Đoán số để dành chiến thắng",
    img: "https://i.imgur.com/i565sKs.png",
    link: "/games/keno3p",
  },
  {
    title: "Keno5P",
    desc: "Đoán số để dành chiến thắng",
    img: "https://i.imgur.com/LaX6FbR.png",
    link: "/games/keno5p",
  },
  {
    title: "Xúc Xắc 3P",
    desc: "Đoán xúc xắc để dành chiến thắng",
    img: "https://i.imgur.com/zzVnhLi.png",
    link: "/games/xucxac3p",
  },
  {
    title: "Xúc Xắc 5P",
    desc: "Đoán xúc xắc để dành chiến thắng",
    img: "https://i.imgur.com/mPAffoY.png",
    link: "/games/xucxac5p",
  },
];
const Home = () => {
  const GameItem = styled(Box)(({ theme }) => ({
    marginTop: "10px",
    background: "linear-gradient(124.32deg,#df2a2a 12.08%,#ee8d8d 85.02%)",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    "& .desc": {
      display: "flex",
      flexDirection: "column",

      "& .title-game": {
        color: theme.palette.text.primary,
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      "& .desc-game": {
        color: theme.palette.text.primary,
        fontSize: "1.5rem",
      },
    },
    "& img": {
      height: "100%",
      width: "100%",
      maxWidth: "100px",
    },
  }));

  return (
    <>
      <Layout>
        <Box
          sx={{
            paddingTop: "150px",
          }}
        >
          <h2 className="title">Games</h2>
          {listGame.map((item, i) => (
            <Link href={item.link} key={i}>
              <GameItem>
                <Box className="desc">
                  <Typography className="title-game">{item.title}</Typography>
                  <Typography className="desc-game">{item.desc}</Typography>
                </Box>
                <img src={item.img} />
              </GameItem>
            </Link>
          ))}
        </Box>
      </Layout>
    </>
  );
};

export default Home;
