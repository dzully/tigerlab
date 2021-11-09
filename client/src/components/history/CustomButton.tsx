import { Button } from "@mui/material";
import classes from "./CustomButton.module.css";

interface CustomButtonProps {
  handleAction?: () => void;
  buttonTitle?: string;
}

const CustomButton = ({
  handleAction,
  buttonTitle = "Back To List",
}: CustomButtonProps) => {
  const onHandleAction = () => {
    if (handleAction) handleAction();
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        className={classes.customButton}
        onClick={onHandleAction}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default CustomButton;
