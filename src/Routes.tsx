import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as Views from "./Views";

const Routes = ({ ...props }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Views.News} {...props} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
