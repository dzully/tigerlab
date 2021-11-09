import { List } from "@mui/material";
import classes from "./index.module.css";
import Item from "./Item";
import Header from "./Header";
import { useContext } from "react";
import { initialStateProps, Store, listApiProps } from "../store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state }: { state: initialStateProps } = useContext(Store);
  let navigate = useNavigate();
  const listApi: any = state?.listApi;

  const handleSelected = (param: string) => {
    navigate(param);
  };

  return (
    <div className={classes.root}>
      <Header />
      <nav aria-label="main item">
        <List>
          {listApi?.map((model: listApiProps, key: number) => (
            <Item
              key={key.toString()}
              data={model}
              handleSelected={handleSelected}
            />
          ))}
        </List>
      </nav>
    </div>
  );
};

export default Home;
