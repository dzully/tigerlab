import Home from "./home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import CustomAlert, { popupProps } from "./CustomAlert";
import { instruments } from "../config/fetch";
import { appTitle, BASE_URL } from "../config/utils";
import {
  initialStateProps,
  listApiProps,
  MainCallback,
  ModelProps,
  Store,
} from "./store";
import Loading from "./Loading";
import History from "./history";
import Detail from "./detail";

const Navigation = () => {
  const { state, dispatch }: { state: initialStateProps; dispatch: any } =
    useContext(Store);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<popupProps>({
    status: false,
    severity: "success",
    message: "",
  });
  const location = useLocation();
  const listApi: Array<listApiProps> | null = state?.listApi;
  const storageData: Array<ModelProps> | null = state?.storageData;
  const selectedCategory: listApiProps | null = state?.selectedCategory;

  useEffect(() => {
    const handleInitializer = () => {
      let model: Array<ModelProps> = [];
      listApi?.forEach((child: listApiProps) => {
        model = [...model, { id: child.category, features: [] }];
      });
      const struct: string = JSON.stringify(model);

      dispatch({
        type: MainCallback.HANDLE_STORAGE_DATA,
        value: model,
      });
      localStorage.setItem(appTitle, struct);
    };

    const handleAvailable = () => {
      const getStorage: string = localStorage.getItem(appTitle) || "";
      if (getStorage?.length > 0) {
        const struct: Array<ModelProps> = JSON.parse(getStorage);
        dispatch({
          type: MainCallback.HANDLE_STORAGE_DATA,
          value: struct,
        });
      }
    };

    const handleLocalStorage = () => {
      const getItem: any = localStorage.getItem(appTitle);
      if (!getItem) {
        handleInitializer();
      } else {
        handleAvailable();
      }
    };

    if (listApi && !storageData) {
      handleLocalStorage();
    }
  }, [dispatch, listApi, storageData]);

  useEffect(() => {
    if (!listApi) {
      const handleResponse = (response: any) => {
        setLoading(false);
        const listTest: Array<listApiProps> = response.tests;
        dispatch({
          type: MainCallback.HANDLE_LIST_API,
          value: listTest,
        });

        setPopup({
          status: true,
          message: "Successfully Get Data",
          severity: "success",
        });
      };

      const handleError = () => {
        setLoading(false);
      };

      setLoading(true);
      const uri: string = BASE_URL;
      instruments(uri, handleResponse, handleError);
    }
  }, [dispatch, listApi]);

  useEffect(() => {
    const handleHistory = () => {
      const id: string = location.pathname.split("/")[1];
      if (!selectedCategory || selectedCategory?.category !== id) {
        if (listApi && id?.length > 0) {
          const revokeId: string = id === "services" ? "microservices" : id;
          const initItem: Array<listApiProps> = listApi?.filter(
            (model: listApiProps) => model.category === revokeId
          );

          if (initItem?.length > 0) {
            const getItem: listApiProps = initItem[0];
            if (getItem) {
              dispatch({
                type: MainCallback.HANDLE_SELECTED_CATEGORY,
                value: getItem,
              });
            }
          }
        }
      }
    };

    handleHistory();
    window.addEventListener("popstate", handleHistory);

    return (): void => {
      window.removeEventListener("popstate", handleHistory);
    };
  }, [dispatch, listApi, location, selectedCategory]);

  const handleClosePopup = () => {
    setPopup({
      ...popup,
      status: false,
    });
  };

  return (
    <Fragment>
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":id" element={<History />} />
          <Route path=":id/*" element={<Detail />} />
        </Routes>
      ) : (
        <Loading />
      )}

      <CustomAlert handleClose={handleClosePopup} popup={popup} />
    </Fragment>
  );
};

export default Navigation;
