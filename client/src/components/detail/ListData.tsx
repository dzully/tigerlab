import { queryProps } from ".";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import classes from "./ListData.module.css";
import { Typography } from "@mui/material";
import { format } from "date-fns";

interface ListDataProps {
  data: queryProps;
}

const ListData = ({ data }: ListDataProps) => {
  let dateView: string = "";
  if (data.date) {
    const result = format(new Date(data.date), "MM/dd/yyyy");
    dateView = result;
  }

  return (
    <div className={classes.root}>
      <ListItem disablePadding className={classes.listItem}>
        <ListItemText
          classes={{ primary: classes.title }}
          primary={data?.title}
          secondary={data?.description}
        />
        <Typography variant="caption" className={classes.endTitle}>
          {dateView}
        </Typography>
      </ListItem>
    </div>
  );
};

export default ListData;
