import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
const DanhSachBank = ({ danhSachNganHang }) => {
  const { data: session, status } = useSession();

  const [selectedBank, setSelectedBank] = useState(null);
  const handleClickSelectBank = (bank) => {
    setSelectedBank(bank);
  };
  return (
    <>
      <h2 className="title">Chọn ngân hàng muốn nạp tiền</h2>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0,1fr))",
          gap: "10px",
          marginTop: "10px",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {danhSachNganHang &&
          danhSachNganHang.map((item) => (
            <Box
              key={item.tenBank}
              onClick={() => handleClickSelectBank(item)}
              sx={{
                border:
                  selectedBank && selectedBank.tenBank === item.tenBank
                    ? (theme) => `1px solid ${theme.palette.color.primary}`
                    : null,
                padding: "10px",
                boxShadow: "0 5px 5px #c5c5da40",
                display: "flex",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  "& img": {
                    objectFit: "cover",
                    maxWidth: "80px",
                    height: "80px",
                    width: "100%",
                    borderRadius: "10px",
                  },
                }}
              >
                <img src={item.image} />
              </Box>
            </Box>
          ))}
      </Box>
      {danhSachNganHang && danhSachNganHang.length === 0 && (
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.color.primary}`,
            padding: "10px",
            marginTop: "30px",

            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Typography sx={{}}>Hệ thống nạp tiền đang bảo trì, vui lòng quay lại sau</Typography>
        </Box>
      )}
      {selectedBank && (
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.color.primary}`,
            padding: "10px",
            marginTop: "30px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Typography sx={{}}>
            Ngân hàng: <b>{selectedBank.tenBank}</b>
          </Typography>
          <Typography sx={{}}>
            Chủ tài khoản: <b>{selectedBank.tenChuTaiKhoan}</b>
          </Typography>
          <Typography sx={{}}>
            Số tài khoản: <b>{selectedBank.soTaiKhoan}</b>
          </Typography>
          <Typography sx={{}}>
            Nội dung: <b>{selectedBank.noiDungNapTien + session.user.taiKhoan}</b>
            <ContentCopyIcon
              onClick={() =>
                navigator.clipboard.writeText(selectedBank.noiDungNapTien + session.user.taiKhoan).then(() => {
                  toast.success("Copy thành công");
                })
              }
            />
          </Typography>
        </Box>
      )}
    </>
  );
};
export default DanhSachBank;
