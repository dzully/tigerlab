import classes from "./Item.module.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { listApiProps, listApiTestProps } from "../store";

interface ItemProps {
  data: listApiProps | listApiTestProps;
  handleSelected?: (param: string) => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  selected?: string;
}

const Item = ({
  data,
  handleSelected,
  primaryLabel = "category",
  selected = "category",
  secondaryLabel = "description",
}: ItemProps) => {
  const onHandleSelected = () => {
    const selectedData: string = data[selected]
      ? data[selected].toString()
      : "";

    if (handleSelected) handleSelected(selectedData);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        className={classes.listItemButton}
        onClick={onHandleSelected}
      >
        <ListItemText
          classes={{ primary: classes.title }}
          primary={data[primaryLabel] ? data[primaryLabel] : ""}
          secondary={data[secondaryLabel] ? data[secondaryLabel] : ""}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Item;
