import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute_CMP";

import Products from "./pages/Products_PG";
import Home from "./pages/Home_PG";
import Mock from "./pages/Mock_PG";

function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/p/:id" component={Products} />
        <PrivateRoute exact path="/p" component={Products} />
        {/* <PrivateRoute exact path="/Mock" component={Mock}/> */}
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
