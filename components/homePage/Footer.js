import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Footer = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (router.pathname === "/") {
      setValue("trangchu");
    } else if (router.pathname.startsWith("/thongbao")) {
      setValue("thongbao");
    } else if (router.pathname.startsWith("/naptien")) {
      setValue("naptien");
    } else if (router.pathname.startsWith("/canhan")) {
      setValue("canhan");
    } else if (router.pathname.startsWith("/contact")) {
      setValue("contact");
    }
  }, [router.pathname]);

  const FooterContainer = styled(Box)(({ theme }) => ({
    background: "url(https://i.imgur.com/AQvyl6R.png) no-repeat 50%/cover",
    maxWidth: "540px",
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    height: "78px",
    zIndex: theme.zIndex.drawer + 1,
    gap: "10px",
    display: "flex",
  }));

  const FooterItem = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    alignItems: "center",
    color: "#949494",
    display: "flex",
    flex: "1 1",
    flexDirection: "column",
    gap: "0.11707rem",
    justifyContent: "center",

    "&:hover": {},
  }));
  const listItem = [
    {
      key: "thongbao",
      icon: <NotificationsNoneIcon />,
      activeIcon: <NotificationsIcon />,
      url: "/thongbao",
      title: "Thông báo",
    },
    {
      key: "naptien",
      icon: <AddBusinessOutlinedIcon />,
      activeIcon: <AddBusinessIcon />,
      url: "/naptien",
      title: "Nạp tiền",
    },
    {
      key: "trangchu",
      icon: <HomeOutlinedIcon />,
      activeIcon: <HomeOutlinedIcon />,
      url: "/",
      title: "Trang chủ",
    },
    {
      key: "canhan",
      icon: <AccountCircleOutlinedIcon />,
      activeIcon: <AccountCircleIcon />,
      url: "/canhan",
      title: "Cá nhân",
    },
    {
      key: "contact",
      icon: <HeadsetMicOutlinedIcon />,
      activeIcon: <HeadsetMicIcon />,
      url: "/contact",
      title: "CSKH",
    },
  ];
  return (
    <>
      <FooterContainer>
        {listItem.map((item, i) => {
          if (item.key !== "trangchu") {
            return (
              <Link href={item.url} key={item.key}>
                <FooterItem className={"footer-item"}>
                  {item.key === value && <Box className="icon_footer active">{item.activeIcon}</Box>}
                  {item.key !== value && <Box className="icon_footer">{item.icon}</Box>}
                  <Box
                    className="title_footer"
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  >
                    {item.title}
                  </Box>
                </FooterItem>
              </Link>
            );
          } else {
            return (
              <Link href={item.url} key={item.key}>
                <FooterItem className={"footer-item"}>
                  {item.key === value && <Box className="icon_footer active">{item.activeIcon}</Box>}
                  {item.key !== value && <Box className="icon_footer">{item.icon}</Box>}

                  <div class="footer-center-bg"></div>
                  <Box
                    className="title_footer"
                    sx={{
                      fontSize: "1.5rem",
                      marginTop: "2rem",
                    }}
                  >
                    {item.title}
                  </Box>
                </FooterItem>
              </Link>
            );
          }
        })}
      </FooterContainer>
    </>
  );
};
export default Footer;
