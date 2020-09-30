import React from "react";
import { AuthProvider } from "./AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Typography from "./styles/typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./styles/material";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Typography />
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
