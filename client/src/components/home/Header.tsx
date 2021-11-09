import { Typography } from "@mui/material";
import classes from "./Header.module.css";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({
  title = "List System",
  subtitle = "The application fetches a collection of tests from the backend and performs calls to the backend API to execute the individual tests.",
}: HeaderProps) => {
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        {subtitle}
      </Typography>
    </div>
  );
};

export default Header;
