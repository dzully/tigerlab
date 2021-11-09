import { useContext, useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  initialStateProps,
  listApiProps,
  listApiTestProps,
  MainCallback,
  modelDataProps,
  ModelProps,
  Store,
} from "../store";
import classes from "./index.module.css";
import Header from "../home/Header";
import CustomButton from "../history/CustomButton";
import Item from "./Item";
import CustomAlert, { popupProps } from "../CustomAlert";
import { appTitle } from "../../config/utils";
import ListData from "./ListData";
import { List, Typography } from "@mui/material";

export interface queryProps {
  title: string;
  description: string;
  date: Date;
}

const Detail = () => {
  const [query, setQuery] = useState<queryProps>({
    title: "",
    description: "",
    date: new Date(),
  });
  const [popup, setPopup] = useState<popupProps>({
    status: false,
    message: "",
    severity: "success",
  });
  const [listData, setListData] = useState<modelDataProps | null>(null);
  const { state, dispatch }: { state: initialStateProps; dispatch: any } =
    useContext(Store);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname: string = location.pathname;
  const listApi: Array<listApiProps> | null = state?.listApi;
  const selectedCategory: listApiProps | null = state?.selectedCategory;
  const selectedTest: listApiTestProps | null = state?.selectedTest;
  const storageData: Array<ModelProps> | null = state?.storageData;

  useEffect(() => {
    if (storageData && selectedTest && !listData) {
      const initServices: Array<ModelProps> = storageData?.filter(
        (model: ModelProps) => model.id === selectedCategory?.category
      );

      if (initServices?.length > 0) {
        const getServices: ModelProps = initServices[0];
        const getFeatures: Array<modelDataProps> = getServices.features;

        getFeatures.forEach((gfStruct: modelDataProps) => {
          if (gfStruct.id === selectedTest.route) {
            setListData(gfStruct);
          }
        });
      }
    }
  }, [listData, selectedCategory?.category, selectedTest, storageData]);

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

  const handlePost = (
    category: string,
    sdStruct: Array<ModelProps>,
    stStruct: listApiTestProps,
    scStruct: listApiProps
  ) => {
    const initData: Array<ModelProps> = sdStruct?.filter(
      (model: ModelProps) => model.id === category
    );
    const nonData: Array<ModelProps> = sdStruct?.filter(
      (model: ModelProps) => model.id !== category
    );

    let featuresModel: Array<modelDataProps> = [];
    if (initData) {
      const getData: ModelProps = initData[0];
      const features: Array<modelDataProps> = getData.features;

      if (features) {
        const initFeat: Array<modelDataProps> = features.filter(
          (fChild: modelDataProps) => fChild.id === stStruct?.route
        );
        const nonFeat: Array<modelDataProps> = features.filter(
          (fChild: modelDataProps) => fChild.id !== stStruct?.route
        );

        if (initFeat) {
          const getFeat: modelDataProps = initFeat[0];
          const data: Array<queryProps> = getFeat?.data;

          if (data) {
            featuresModel = [
              ...nonFeat,
              {
                id: stStruct.route,
                data: [...data, query],
              },
            ];
          } else {
            featuresModel = [
              ...nonFeat,
              {
                id: stStruct.route,
                data: [query],
              },
            ];
          }
        }
      }
    }
    const model: Array<ModelProps> = [
      ...nonData,
      { id: scStruct.category, features: featuresModel },
    ];
    const struct: string = JSON.stringify(model);

    dispatch({
      type: MainCallback.HANDLE_STORAGE_DATA,
      value: model,
    });

    localStorage.setItem(appTitle, struct);
  };

  const handleReset = () => {
    if (listData) {
      const struct: modelDataProps = {
        ...listData,
        data: [...listData?.data, query],
      };

      setListData(struct);
      setQuery({ title: "", description: "", date: new Date() });
    }
  };

  const handleSubmit = () => {
    if (query.title.length > 0 && query.description.length > 0) {
      if (selectedCategory && selectedTest && storageData) {
        const category: string = selectedCategory.category;
        handlePost(category, storageData, selectedTest, selectedCategory);
        handleReset();
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
        {listData ? (
          <nav aria-label="listItem">
            <List>
              {listData?.data &&
                listData?.data?.map((model: queryProps, key: number) => (
                  <ListData key={key.toString()} data={model} />
                ))}
            </List>
          </nav>
        ) : (
          <Typography variant="h6" className={classes.noDataMessage}>
            No Data
          </Typography>
        )}
      </div>
      <CustomAlert popup={popup} handleClose={handleClosePopup} />
    </Fragment>
  );
};

export default Detail;
