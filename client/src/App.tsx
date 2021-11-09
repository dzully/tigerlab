import CssBaseline from "@mui/material/CssBaseline";
import { red } from "@mui/material/colors";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { globalTheme } from "./config/utils";
import Main from "./components";

const theme = createTheme({
  palette: {
    primary: {
      light: globalTheme.light,
      main: globalTheme.primary,
      dark: globalTheme.dark,
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});

const cache = createCache({
  key: "css",
  prepend: true,
});

const App = () => (
  <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </CacheProvider>
    </LocalizationProvider>
  </StyledEngineProvider>
);

export default App;
