import React from "react";
import { AuthProvider } from "./AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Typography from "./styles/typography";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Typography />
      <CssBaseline />
      <Routes />
    </AuthProvider>
  );
}

export default App;
