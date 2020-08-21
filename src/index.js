import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, useHistory } from "react-router-dom";

// import Mock_PG from "./pages/mock_PG";
import Home_PG from "./pages/Home_PG";
import apiTest_PG from "./pages/apiTest_PG";

import './style.scss';

const rootEl = document.getElementById("root");

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <Route path="/" exact component={Home_PG} />
      <Route path="/login" exact component={apiTest_PG} />
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
