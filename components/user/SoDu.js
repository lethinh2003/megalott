import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayBalance } from "../../redux/actions/balance";
import Money from "./Money";
const SoDu = (props) => {
  const dispatch = useDispatch();
  const isDisplayBalance = useSelector((state) => state.balance.display);
  const handleDisplayBalance = (status) => {
    dispatch(setDisplayBalance(status));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Typography>Số dư: {isDisplayBalance ? <Money /> : "******"}</Typography>
        {!isDisplayBalance && <VisibilityIcon onClick={() => handleDisplayBalance(!isDisplayBalance)} />}
        {isDisplayBalance && <VisibilityOffIcon onClick={() => handleDisplayBalance(!isDisplayBalance)} />}
      </Box>
    </>
  );
};
export default SoDu;
