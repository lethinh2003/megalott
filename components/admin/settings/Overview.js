import { Box, Breadcrumbs, Card, Typography } from "@mui/material";

import Link from "next/link";
const listGame = [
  {
    title: "MOMO",
    link: "/admin/settings/momo",
    icon: "https://i.imgur.com/s2UnRTS.jpg",
    introduce: "Chỉnh sửa cài đặt Momo",
  },
  {
    title: "ZALOPAY",
    link: "/admin/settings/zalopay",
    icon: "https://i.imgur.com/jErL7iN.png",
    introduce: "Chỉnh sửa cài đặt ZaloPay",
  },
  {
    title: "THÔNG BÁO",
    link: "/admin/settings/thongbao",
    icon: "https://i.imgur.com/nmkGJFj.png",
    introduce: "Chỉnh sửa thông báo hệ thống",
  },
  {
    title: "YÊU CẦU RÚT TIỀN",
    link: "/admin/settings/ruttien",
    icon: "https://i.imgur.com/XrPK4jK.png",
    introduce: "Xem các yêu cầu rút tiền",
  },
];

const Overview = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Admin
        </Link>
        <Link underline="hover" color="inherit" href="/admin/settings">
          Settings
        </Link>
      </Breadcrumbs>
      <h1
        className="title"
        style={{
          fontSize: "2.5rem",
        }}
      >
        Chỉnh sửa hệ thống
      </h1>
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
                backgroundColor: "#ffffff",
                color: "#201c58",
                height: "220px",

                display: "flex",

                padding: "20px",

                minWidth: "200px",
                maxWidth: "200px",
                boxShadow: "-1px 2px 14px 5px #edf0f8",
                borderRadius: "30px",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img src={item.icon} style={{ width: "100%" }} />
                </Box>

                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  {item.introduce}
                </Typography>
              </Box>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default Overview;
