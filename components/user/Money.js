import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "../../context/socket";
import { setBalance, updateBalance } from "../../redux/actions/balance";
const Money = () => {
  const socket = useContext(SocketContext);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.balance);

  useEffect(() => {
    if (socket && status === "authenticated") {
      socket.emit("get-current-balance", session.user.taiKhoan, (res) => {
        if (res && res.status === "success") {
          dispatch(setBalance(res.data));
        } else if (res && res.status === "error") {
          toast.error("Có lỗi xảy ra khi lấy thông tin tiền tệ");
        }
      });
      socket.off("set-current-balance").on("set-current-balance", (data) => {
        dispatch(setBalance(data));
      });
      socket.off("update-current-balance").on("update-current-balance", (data) => {
        console.log("update balance", data);
        dispatch(updateBalance(data));
      });

      return () => {
        socket.off("set-current-balance");
        socket.off("update-current-balance");
      };
    }
  }, [socket, status]);
  return (
    <>
      <NumericFormat value={balance} displayType="text" allowLeadingZeros thousandSeparator="," />đ
    </>
  );
};
export default Money;
