import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute_CMP";

import Products from "./pages/Products_PG";
import ProductDetail from "./pages/ProductDetail_PG";
import Home from "./pages/Home_PG";
import Users from "./pages/Users_PG";
import Config from "./pages/Configurations_PG";
import Categories from "./pages/Categories_PG";
import Providers from "./pages/Providers_PG";
import ResetPassword from "./pages/ResetPassword_PG";
import Condition from "./pages/Condition_PG";

function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/p" component={Products} />
        <PrivateRoute exact path="/p/create" component={ProductDetail} />
        <PrivateRoute exact path="/p/detail/:id" component={ProductDetail} />

        <PrivateRoute exact path="/u/:id" component={Users} />
        <PrivateRoute exact path="/u" component={Users} />
        
        <PrivateRoute exact path="/c" component={Config} />

        <PrivateRoute exact path="/c/category" component={Categories} />
        <PrivateRoute exact path="/c/provider" component={Providers} />
        <PrivateRoute exact path="/c/condition" component={Condition} />

        <PrivateRoute exact path="/c/category/:id" component={Categories} />
        <PrivateRoute exact path="/c/provider/:id" component={Providers} />
        <PrivateRoute exact path="/c/condition/:id" component={Condition} />

        {/* <PrivateRoute exact path="/Mock" component={Mock}/> */}
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route exact path="/resetPassword/" component={ResetPassword} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
