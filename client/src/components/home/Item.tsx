import classes from "./Item.module.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { listApiProps, listApiTestProps } from "../store";
import { newStructProps } from "../history";
import { Typography } from "@mui/material";

interface ItemProps {
  data: listApiProps | newStructProps | listApiTestProps;
  handleSelected?: (param: string) => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  selected?: string;
  withLabel?: boolean;
}

const Item = ({
  data,
  handleSelected,
  withLabel = false,
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
        <Typography variant="caption" className={classes.endTitle}>
          {withLabel
            ? data?.total
              ? `Total Data ${data.total}`
              : "Total Data 0"
            : null}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default Item;
