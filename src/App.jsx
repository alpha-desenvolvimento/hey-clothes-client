import React from "react";

import { AuthProvider } from "./AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";
import Typography from "./styles/typography";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Typography />
      <Routes />
    </AuthProvider>
  );
}

export default App;
