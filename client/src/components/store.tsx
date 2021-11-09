import { useReducer, createContext } from "react";
import { queryProps } from "./detail";

export interface languageProps {
  label: string;
  value: string;
}

export interface listApiTestProps {
  [key: string]: string;
  name: string;
  route: string;
}

export interface modelDataProps {
  id: string;
  features: Array<queryProps>;
}

export interface ModelProps {
  id: string;
  data: Array<modelDataProps>;
}

export interface listApiProps {
  [key: string]: string | Array<listApiTestProps>;
  category: string;
  description: string;
  tests: Array<listApiTestProps>;
}

export interface initialStateProps {
  listApi: Array<listApiProps> | null;
  selectedCategory: listApiProps | null;
  selectedTest: listApiTestProps | null;
}

interface actionProps {
  [key: string]: string | object | undefined;
  value?: string | object | undefined;
  map?: object;
  maps?: object;
  label?: string;
  type?: string;
}

interface mainCallbackProps {
  HANDLE_LIST_API: string;
  HANDLE_SELECTED_CATEGORY: string;
  HANDLE_SELECTED_TEST: string;
}

const initialState: initialStateProps = {
  listApi: null,
  selectedCategory: null,
  selectedTest: null,
};

export const Store: any = createContext(initialState);

export const MainCallback: mainCallbackProps = {
  HANDLE_LIST_API: "HANDLE_LIST_API",
  HANDLE_SELECTED_CATEGORY: "HANDLE_SELECTED_CATEGORY",
  HANDLE_SELECTED_TEST: "HANDLE_SELECTED_TEST",
};

const reducer = (state: any, action: actionProps) => {
  switch (action.type) {
    case MainCallback.HANDLE_LIST_API:
      return {
        ...state,
        listApi: action.value,
      };
    case MainCallback.HANDLE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.value,
      };
    case MainCallback.HANDLE_SELECTED_TEST:
      return {
        ...state,
        selectedTest: action.value,
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
