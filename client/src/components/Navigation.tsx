import Home from "./home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import CustomAlert, { popupProps } from "./CustomAlert";
import { instruments } from "../config/fetch";
import { BASE_URL } from "../config/utils";
import { initialStateProps, listApiProps, MainCallback, Store } from "./store";
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
  const selectedCategory: listApiProps | null = state?.selectedCategory;

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
          const initItem: Array<listApiProps> = listApi?.filter(
            (model: listApiProps) => model.category === id
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
