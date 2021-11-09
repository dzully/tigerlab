import { CircularProgress } from "@mui/material";
import classes from "./Loading.module.css";

const Loading = () => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
);

export default Loading;
