import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ItemLichSu from "./ItemLichSu";
const DanhSachLichSu = ({ list }) => {
  const { data: session, status } = useSession();
  const [selectedBank, setSelectedBank] = useState(null);
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0,1fr))",
          gap: "10px",
          marginTop: "10px",

          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {list && list.map((item) => <ItemLichSu key={item._id} item={item} />)}
      </Box>
    </>
  );
};
export default DanhSachLichSu;
