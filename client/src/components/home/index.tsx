import { List } from "@mui/material";
import classes from "./index.module.css";
import Item from "./Item";
import Header from "./Header";
import { useContext, useEffect } from "react";
import {
  initialStateProps,
  Store,
  listApiProps,
  MainCallback,
  listApiTestProps,
} from "../store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state, dispatch }: { state: initialStateProps; dispatch: any } =
    useContext(Store);
  let navigate = useNavigate();
  const listApi: Array<listApiProps> | null = state?.listApi;
  const selectedCategory: listApiProps | null = state?.selectedCategory;
  const selectedTest: listApiTestProps | null = state?.selectedTest;

  useEffect(() => {
    if (selectedCategory) {
      dispatch({
        type: MainCallback.HANDLE_SELECTED_CATEGORY,
        value: null,
      });
    }

    if (selectedTest) {
      dispatch({
        type: MainCallback.HANDLE_SELECTED_TEST,
        value: null,
      });
    }
  }, [dispatch, selectedCategory, selectedTest]);

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
