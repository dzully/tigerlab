import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import Navigation from "./Navigation";

const Components = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </StoreProvider>
  );
};

export default Components;
