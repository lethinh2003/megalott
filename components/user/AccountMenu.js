import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AccountMenu = (props) => {
  const { data: session, status } = useSession();

  const AccountMenuItem = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: theme.palette.text.secondary,
    "& svg": {
      color: theme.palette.color.primary,
    },
    "& .title-menu": {
      fontSize: "1.7rem",
    },
  }));
  const listMenu = [
    {
      icon: <LocalAtmOutlinedIcon />,
      title: "Biến động số dư",
      url: "/biendongsodu",
    },
    {
      icon: <CreditScoreOutlinedIcon />,
      title: "Lịch sử nạp",
      url: "/lichsunaptien",
    },
    {
      icon: <PaymentsOutlinedIcon />,
      title: "Lịch sử rút",
      url: "/lichsuruttien",
    },
    {
      icon: <AccountBalanceOutlinedIcon />,
      title: "Liên kết ngân hàng",
      url: "/lienketnganhang",
    },
    {
      icon: <LogoutOutlinedIcon />,
      title: "Đăng xuất",
      url: "/dangxuat",
    },
  ];

  return (
    <>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          marginTop: "40px",
        }}
      >
        {session && session.user && session.user.role === "admin" && (
          <Link href={"/admin"}>
            <AccountMenuItem>
              <ManageAccountsIcon />
              <Typography className="title-menu">Quản lý</Typography>
            </AccountMenuItem>
          </Link>
        )}
        {listMenu.map((item, i) => (
          <Link key={i} href={item.url}>
            <AccountMenuItem>
              {item.icon}
              <Typography className="title-menu">{item.title}</Typography>
            </AccountMenuItem>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default AccountMenu;
