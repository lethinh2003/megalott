import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import BackToTop from "../homePage/BackToTop";

import Navbar from "./Navbar";
import SidebarMobile from "./SidebarMobile";

const Layout = (props) => {
  const { data: session, status } = useSession();

  if (session && session.user.accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${session.user.accessToken}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
  const [isSidebarMobile, setIsSidebarMobile] = useState(false);

  const dispatch = useDispatch();

  const handleClickSidebarMobile = () => {
    setIsSidebarMobile(!isSidebarMobile);
  };
  return (
    <>
      <Navbar />
      {isSidebarMobile && (
        <SidebarMobile
          session={session}
          status={status}
          handleClickSidebarMobile={handleClickSidebarMobile}
          isSidebarMobile={isSidebarMobile}
        />
      )}

      <Box
        sx={{
          bgcolor: "#f8fafb",
          color: "#000000",
          paddingLeft: {
            xs: "0px",
            md: "90px",
          },
          position: "relative",
        }}
        className="box-container"
      >
        {props.children}
      </Box>
      <BackToTop />
    </>
  );
};
export default Layout;
