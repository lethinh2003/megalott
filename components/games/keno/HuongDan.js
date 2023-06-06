import { Typography } from "@mui/material";
import { memo } from "react";
import Modal from "../../homePage/Modal";
const HuongDan = ({ isModal, setIsModal }) => {
  return (
    <>
      <Modal isModal={isModal} setIsModal={setIsModal} title={"Hướng dẫn cách chơi"}>
        <Typography>
          Chiến thắng khi đặt cược bi (tài/xỉu/lẻ/chẵn) khớp với kết quả xổ số. Tỉ lệ ăn 1.98 (đánh 100,000đ ăn
          198,000đ).
        </Typography>
        <Typography>Tài: kết quả lớn hơn 5, Xỉu: ngược lại</Typography>
        <Typography>Chẵn: kết quả chia hết cho 2, Lẻ: ngược lại</Typography>
        <Typography>Ví dụ: Bi 1 ra kết quả là 6 thì sẽ là tài, chẵn.</Typography>
      </Modal>
    </>
  );
};
export default memo(HuongDan);
