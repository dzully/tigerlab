import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";

export interface popupProps {
  message: string;
  status: boolean;
  severity: AlertColor;
}

export interface CustomAlertProps {
  popup: popupProps;
  autoHideDuration?: number;
  handleClose?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({
  popup,
  autoHideDuration = 4000,
  handleClose,
}: CustomAlertProps) => {
  const onHandleClose = () => {
    if (handleClose) handleClose();
  };

  return (
    <Snackbar
      open={popup.status}
      autoHideDuration={autoHideDuration}
      onClose={onHandleClose}
    >
      <Alert
        onClose={onHandleClose}
        severity={popup.severity}
        sx={{ width: "100%" }}
      >
        {popup.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
