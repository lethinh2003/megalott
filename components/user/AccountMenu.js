import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
const AccountMenu = (props) => {
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
    "& .title": {
      fontSize: "17px",
    },
  }));
  const listMenu = [
    {
      icon: <LocalAtmOutlinedIcon />,
      title: "Biến động số dư",
      url: "",
    },
    {
      icon: <CreditScoreOutlinedIcon />,
      title: "Lịch sử nạp",
      url: "",
    },
    {
      icon: <PaymentsOutlinedIcon />,
      title: "Lịch sử rút",
      url: "",
    },
    {
      icon: <AccountBalanceOutlinedIcon />,
      title: "Liên kết ngân hàng",
      url: "",
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
        {listMenu.map((item, i) => (
          <Link key={i} href={item.url}>
            <AccountMenuItem>
              {item.icon}
              <Typography className="title">{item.title}</Typography>
            </AccountMenuItem>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default AccountMenu;
