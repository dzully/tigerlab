import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  initialStateProps,
  listApiProps,
  listApiTestProps,
  Store,
} from "../store";
import classes from "./index.module.css";
import Header from "../home/Header";
import { List } from "@mui/material";
import Item from "../home/Item";
import CustomButton from "./CustomButton";

const History = () => {
  const { state }: { state: initialStateProps } = useContext(Store);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory: listApiProps | null = state?.selectedCategory;

  const handleSelected = (param: string) => {
    navigate(param);
  };

  const onHandleAction = () => {
    if (location.key === "default") {
      window.location.pathname = "/";
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={classes.root}>
      <CustomButton handleAction={onHandleAction} />
      <Header
        title={selectedCategory?.category}
        subtitle={selectedCategory?.description}
      />
      <nav aria-label="main item">
        <List>
          {selectedCategory?.tests?.map(
            (model: listApiTestProps, key: number) => (
              <Item
                key={key.toString()}
                data={model}
                handleSelected={handleSelected}
                selected="route"
                primaryLabel="name"
                secondaryLabel="route"
              />
            )
          )}
        </List>
      </nav>
    </div>
  );
};

export default History;
