import { Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { queryProps } from ".";
import classes from "./Item.module.css";

interface ItemProps {
  buttonTitle?: string;
  handleChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    label: string
  ) => void;
  query: queryProps;
  handleSubmit?: () => void;
}

const Item = ({
  buttonTitle = "Submit",
  handleChange,
  query,
  handleSubmit,
}: ItemProps) => {
  const onHandleClick = () => {
    if (handleSubmit) handleSubmit();
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.customTextfield}
        variant="outlined"
        placeholder="Title"
        value={query.title}
        onChange={(event: any) => handleChange(event, "title")}
      />
      <TextField
        className={classes.customTextfield}
        variant="outlined"
        placeholder="Description"
        value={query.description}
        onChange={(event: any) => handleChange(event, "description")}
      />
      <div className={classes.actionContainer}>
        <Button variant="contained" onClick={onHandleClick}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default Item;
