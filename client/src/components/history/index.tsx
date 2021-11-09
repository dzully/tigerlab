import { useContext, useEffect, useState } from "react";
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
import { List } from "@mui/material";
import Item from "../home/Item";
import CustomButton from "./CustomButton";

export interface newStructProps {
  [key: string]: string | number;
  name: string;
  route: string;
  total: number;
}

const History = () => {
  const [selectedStorage, setSelectedStorage] =
    useState<Array<newStructProps> | null>(null);
  const { state, dispatch }: { state: initialStateProps; dispatch: any } =
    useContext(Store);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory: listApiProps | null = state?.selectedCategory;
  const storageData: Array<ModelProps> | null = state?.storageData;
  const selectedTest: listApiTestProps | null = state?.selectedTest;

  useEffect(() => {
    if (selectedTest) {
      dispatch({
        type: MainCallback.HANDLE_SELECTED_TEST,
        value: null,
      });
    }
  }, [dispatch, selectedTest]);

  useEffect(() => {
    if (
      !selectedStorage &&
      selectedCategory &&
      storageData &&
      typeof storageData !== "string"
    ) {
      const initItem: Array<ModelProps> = storageData.filter(
        (model: ModelProps) => model.id === selectedCategory?.category
      );

      if (initItem) {
        const getItem: ModelProps = initItem[0];
        const features: Array<modelDataProps> = getItem.features;

        let newStruct: Array<newStructProps> = [];
        let checkData: Array<string> = [];
        selectedCategory?.tests?.forEach((stModel: listApiTestProps) => {
          features.forEach((model: modelDataProps) => {
            if (model.id === stModel.route) {
              const childStruct = {
                ...stModel,
                total: model?.data?.length || 0,
              };

              newStruct = [...newStruct, childStruct];
              checkData = [...checkData, stModel.name];
            }
          });

          if (checkData.indexOf(stModel.name) === -1) {
            const childStruct = {
              ...stModel,
              total: 0,
            };

            checkData = [...checkData, stModel.name];
            newStruct = [...newStruct, childStruct];
          }
        });

        const toPost: any =
          newStruct?.length > 0 ? newStruct : selectedCategory.tests;
        setSelectedStorage(toPost);
      }
    }
  }, [selectedCategory, selectedStorage, storageData]);

  const handleSelected = (param: string) => {
    navigate(param);
  };

  const onHandleAction = () => {
    setSelectedStorage(null);
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
          {selectedStorage &&
            selectedStorage?.map((model: newStructProps, key: number) => (
              <Item
                withLabel
                key={key.toString()}
                data={model}
                handleSelected={handleSelected}
                selected="route"
                primaryLabel="name"
                secondaryLabel="route"
              />
            ))}
        </List>
      </nav>
    </div>
  );
};

export default History;
