import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, useHistory } from "react-router-dom";

import PG_Mock from "./pages/mock_PG";
import apiTest_PG from "./pages/apiTest_PG";
const rootEl = document.getElementById("root");

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <Route path="/" exact component={() => <PG_Mock text={`Home page`} />} />
      <Route path="/apITest" exact component={apiTest_PG} />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl
);
