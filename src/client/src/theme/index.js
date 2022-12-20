import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";

import palette from "./palette";
import typography from "./typography";
// import shadows from "./shadows";
// import ComponentOverrides from "./overrides";

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      //   shadows: shadows,
      shape: { borderRadius: 8 },
    }),
    []
  );
  const theme = createTheme(themeOptions);
  //   theme.components = ComponentOverrides(theme);
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
