import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  color: "#000",
  "&.MuiDialog-root": {
    width: "100%",
    maxWidth: "540px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  "& .MuiDialog-paper": {
    borderRadius: "10px",
  },
  "& .MuiDialogContent-root": {
    color: "#000",
    fontSize: "1.5rem",
    marginTop: "20px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Modal = (props) => {
  const { isModal, setIsModal, title } = props;
  const handleClose = () => {
    setIsModal(false);
  };
  return (
    <>
      <CustomDialog open={isModal} onClose={handleClose} disableScrollLock>
        <DialogTitle
          sx={{
            backgroundColor: "#ff0000",
            fontWeight: "bold",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};
export default Modal;
