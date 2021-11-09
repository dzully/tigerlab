import { useContext, useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  initialStateProps,
  listApiProps,
  listApiTestProps,
  MainCallback,
  ModelProps,
  Store,
} from "../store";
import classes from "./index.module.css";
import Header from "../home/Header";
import CustomButton from "../history/CustomButton";
import Item from "./Item";
import CustomAlert, { popupProps } from "../CustomAlert";

export interface queryProps {
  title: string;
  description: string;
}

const Detail = () => {
  const [query, setQuery] = useState<queryProps>({
    title: "",
    description: "",
  });
  const [popup, setPopup] = useState<popupProps>({
    status: false,
    message: "",
    severity: "success",
  });
  const { state, dispatch }: { state: initialStateProps; dispatch: any } =
    useContext(Store);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname: string = location.pathname;
  const listApi: Array<listApiProps> | null = state?.listApi;
  const selectedCategory: listApiProps | null = state?.selectedCategory;
  const selectedTest: listApiTestProps | null = state?.selectedTest;
  console.log({ selectedCategory });

  useEffect(() => {
    if (listApi && selectedCategory && pathname && !selectedTest) {
      const initItem: Array<listApiTestProps> = selectedCategory?.tests?.filter(
        (model: listApiTestProps) => model.route === pathname
      );

      if (initItem?.length > 0) {
        const getItem: listApiTestProps = initItem[0];
        if (getItem) {
          dispatch({
            type: MainCallback.HANDLE_SELECTED_TEST,
            value: getItem,
          });
        }
      }
    }
  }, [dispatch, pathname, listApi, selectedCategory, selectedTest]);

  const onHandleAction = () => {
    if (location.key === "default") {
      window.location.pathname = "/";
    } else {
      navigate(-1);
    }
  };

  const handleChange = (event: any, label: string) => {
    const value: string = event.target.value;
    const model = {
      ...query,
      [label]: value,
    };
    setQuery(model);
  };

  const handleSubmit = () => {
    if (query.title.length > 0 && query.description.length > 0) {
      if (selectedCategory && selectedTest) {
        const label: string = selectedCategory.category;
        const model: ModelProps = {
          id: selectedCategory.category,
          data: [{ id: selectedTest.route, features: [query] }],
        };
        const struct = JSON.stringify(model);
        localStorage.setItem(label, struct);
        setPopup({
          status: true,
          message: "Successfully Submit",
          severity: "success",
        });
      }
    }
  };

  const handleClosePopup = () => {
    setPopup({
      ...popup,
      status: false,
    });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.header}>
          <CustomButton
            handleAction={onHandleAction}
            buttonTitle="Back To List History"
          />
          <Header title={selectedTest?.name} subtitle={selectedTest?.route} />
        </div>
        <Item
          handleChange={handleChange}
          query={query}
          handleSubmit={handleSubmit}
        />
      </div>
      <CustomAlert popup={popup} handleClose={handleClosePopup} />
    </Fragment>
  );
};

export default Detail;
