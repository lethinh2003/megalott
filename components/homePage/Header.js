import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Header = (props) => {
  const { data: session, status } = useSession();

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
            {status === "unauthenticated" && (
              <>
                <Link href="/dangnhap">
                  <Button className="btn-login">Đăng nhập</Button>
                </Link>
                <Link href="/dangky">
                  <Button className="btn-register">Đăng ký</Button>
                </Link>
              </>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};
export default Header;
