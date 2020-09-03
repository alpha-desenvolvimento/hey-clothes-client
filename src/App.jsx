import React from "react";

import { AuthProvider } from "./AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Routes />
    </AuthProvider>
  );
}

export default App;
