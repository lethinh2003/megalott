import { Typography } from "@mui/material";
import { memo } from "react";
import { InputComponent, inputStyles, rootInputStyles, rootStyles } from "../../../custom/textfield";

const MoneyInput = ({ tienCuoc, setTienCuoc }) => {
  return (
    <>
      <Typography>Chọn tiền cược</Typography>
      <InputComponent
        defaultValue={0}
        value={tienCuoc}
        onChange={(e) => setTienCuoc(e.target.value)}
        placeholder="Số tiền"
        size="small"
        type="number"
        fullWidth
        sx={{
          ...rootStyles,
        }}
        InputProps={{
          sx: {
            ...rootInputStyles,
          },
        }}
        inputProps={{
          sx: {
            ...inputStyles,
          },
        }}
      />
    </>
  );
};
export default memo(MoneyInput);
