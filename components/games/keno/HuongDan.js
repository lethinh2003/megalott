import { Typography } from "@mui/material";
import { memo } from "react";
import Modal from "../../homePage/Modal";
const HuongDan = ({ isModal, setIsModal }) => {
  return (
    <>
      <Modal isModal={isModal} setIsModal={setIsModal} title={"Hướng dẫn cách chơi"}>
        <Typography>
          Chiến thắng khi đặt cược bi (tài/xỉu/lẻ/chẵn) khớp với kết quả xổ số. Ví dụ tỉ lệ ăn là x1.98 thì khi đánh
          100,000đ sẽ thắng được 198,000đ.
        </Typography>
        <Typography>Tài: kết quả từ 5 đến 9, Xỉu: kết quả từ 0 đến 4</Typography>
        <Typography>Chẵn: kết quả là số chia hết cho 2, Lẻ: kết quả là số không chia hết cho 2</Typography>
        <Typography>Ví dụ: Bi 1 ra kết quả là 6 thì sẽ là tài và chẵn.</Typography>
        <Typography>Ví dụ: Bi 2 ra kết quả là 1 thì sẽ là xỉu và lẻ.</Typography>
      </Modal>
    </>
  );
};
export default memo(HuongDan);
