import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import Money from "./Money";
const AccountInfo = ({ user }) => {
  const AccountInfoContainer = styled(Box)(({ theme }) => ({
    borderRadius: "20px",
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.color.primary}`,
    position: "relative",
    height: "300px",
    marginTop: "30px",
  }));
  const TitleLeft = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.color.primary,
    height: "2.3rem",
    position: "absolute",
    top: "-12px",
    transform: "translate(-50%)",
    clipPath: "polygon(50% 0,100% 0,50% 50%,100% 100%,50% 100%,0 50%)",
    left: "calc(50% - 50px)",
    width: "1rem",
  }));
  const TitleCenter = styled(TitleLeft)(({ theme }) => ({
    clipPath: "polygon(7% 0,93% 0,100% 50%,93% 100%,7% 100%,0 50%)",
    width: "unset",
    fontSize: "1.5rem",
    left: "50%",
    textAlign: "center",
    padding: "0 10px",
  }));
  const TitleRight = styled(TitleLeft)(({ theme }) => ({
    clipPath: "polygon(50% 0,100% 0,50% 50%,100% 100%,50% 100%,0 50%)",

    left: "calc(50% + 50px)",
    transform: "translate(-50%) rotate(180deg)",

    textAlign: "center",
  }));

  const TransactionBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    bottom: "-35px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",

    background: "linear-gradient(180deg,#da4141,red)",

    padding: "10px",
    borderRadius: "10px",
    fontSize: "1.5rem",

    "& .item": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
      gap: "10px",
      "&:first-of-type": {
        borderRight: "1px solid",
      },
    },
  }));

  const AccountMenuItem = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    color: theme.palette.text.secondary,
    "& .icon": {
      color: theme.palette.color.primary,
    },
    "& .title": {
      fontSize: "17px",
    },
  }));

  const SplitBorder = styled(Box)(({ theme }) => ({
    left: "50%",

    position: "absolute",
    textAlign: "center",
    top: 0,
    transform: "translate(-50%)",
    width: "100%",
    "& span": {
      borderTop: "1rem solid #fff",
      display: "inline-block",
      position: "relative",
      top: "1rem",
      width: "2.4rem",
    },
  }));

  const BorderTopStyle = styled(Box)(({ theme }) => ({
    left: "50%",

    position: "absolute",
    top: 0,
    textAlign: "center",
    transform: "translate(-50%)",
    width: "100%",
    "& span": {
      position: "absolute",
      top: 0,
      "&:first-of-type": {
        borderLeft: `3px solid ${theme.palette.color.primary}`,
        borderTop: `3px solid${theme.palette.color.primary}`,
        borderTopLeftRadius: "16px",
        height: "3rem",
        left: "0",
        width: "3rem",
        "&:after": {
          backgroundColor: theme.palette.color.primary,
          borderRadius: "50%",
          content: `""`,
          height: "0.5rem",
          left: "1rem",
          position: "absolute",
          top: "1rem",
          width: "0.5rem",
        },
      },
      "&:last-of-type": {
        borderRight: `3px solid ${theme.palette.color.primary}`,
        borderTop: `3px solid ${theme.palette.color.primary}`,
        borderTopRightRadius: "16px",
        height: "3rem",
        right: "0",
        width: "3rem",
        "&:after": {
          backgroundColor: theme.palette.color.primary,
          borderRadius: "50%",
          content: `""`,
          height: "0.5rem",
          right: "1rem",
          position: "absolute",
          top: "1rem",
          width: "0.5rem",
        },
      },
    },
  }));
  return (
    <>
      <AccountInfoContainer>
        <SplitBorder>
          <span></span>
        </SplitBorder>
        <BorderTopStyle>
          <span></span>
          <span></span>
        </BorderTopStyle>
        <TitleLeft />
        <TitleCenter>Tài khoản</TitleCenter>
        <TitleRight />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "30px",
            color: (theme) => theme.palette.color.secondary,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                "& img": {
                  borderRadius: "50%",
                  objectFit: "cover",
                },
              }}
            >
              <Image
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={user.avatar}
                width={80}
                height={80}
                alt="Picture of the author"
              />
            </Box>
            <Typography sx={{}}>{user.taiKhoan}</Typography>
            <Typography
              sx={{
                fontSize: "3rem",
              }}
            >
              <Money />
            </Typography>
          </Box>
        </Box>
        <TransactionBox>
          <Link href="/naptien">
            <Box
              className="item"
              sx={{
                cursor: "pointer",
              }}
            >
              <AddCardOutlinedIcon />
              <Typography>Nạp tiền</Typography>
            </Box>
          </Link>
          <Link href="/ruttien">
            <Box
              sx={{
                cursor: "pointer",
              }}
              className="item"
            >
              <PriceChangeOutlinedIcon />
              <Typography>Rút tiền</Typography>
            </Box>
          </Link>
        </TransactionBox>
      </AccountInfoContainer>
    </>
  );
};
export default AccountInfo;
