import { Box, Button, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Header = (props) => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const router = useRouter();

  const BoxMenuNavBar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.header.background.default,

    borderRight: theme.palette.mode === "light" ? "1px solid #dcdee0" : "1px solid #4b4c4e",
  }));
  const MenuNavBarItem = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    width: "80px",
    height: "80px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#1a1a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    opacity: 0.85,
    backgroundColor: theme.palette.navItem.background,

    "&:hover": {
      backgroundColor: theme.palette.navItem.hover,
      borderRadius: "20px",
    },

    "&.active": {
      backgroundColor: theme.palette.navItem.active,
      borderRadius: "20px",
    },
  }));

  return (
    <>
      <div className="header">
        <div className="header-top">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography
              className="logo"
              sx={{
                color: "#ffffff",
                fontSize: "3rem",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Megalott
            </Typography>
            <img
              src="https://i.imgur.com/tUCRwwB.png"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </Box>
          <Box
            className="header-right"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button className="btn-login">Đăng nhập</Button>
            <Button className="btn-register">Đăng ký</Button>
          </Box>
        </div>
      </div>
    </>
  );
};
export default Header;
