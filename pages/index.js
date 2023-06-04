import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Layout from "../components/Layout";
const Home = () => {
  const GameItem = styled(Box)(({ theme }) => ({
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
          <Link href="/games/keno1p">
            <GameItem>
              <Box className="desc">
                <Typography className="title-game">Keno1p</Typography>
                <Typography className="desc-game">Đoán số để dành chiến thắng</Typography>
              </Box>
              <img src="https://i.imgur.com/x6zOE0C.png" />
            </GameItem>
          </Link>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
