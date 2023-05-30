import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Footer from "./homePage/Footer";
import Header from "./homePage/Header";
const Layout = (props) => {
  const { data: session, status } = useSession();

  if (session && session.user.accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${session.user.accessToken}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }

  return (
    <>
      <Box
        className="App"
        sx={{
          boxShadow: "0 0 6rem 0 hsla(0,0%,49%,.3)",
          margin: "0 auto",
          maxWidth: "540px",
          minHeight: "100vh",
        }}
      >
        <Box
          className="main"
          sx={{
            background: "#fff7f7",
            minHeight: "100vh",
            padding: "0 0.32rem 2rem",
          }}
        >
          <Header />
          <Box
            sx={{
              padding: "10px",
              position: "relative",
              zIndex: 1,
              paddingBottom: "70px",
            }}
          >
            {props.children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};
export default Layout;
