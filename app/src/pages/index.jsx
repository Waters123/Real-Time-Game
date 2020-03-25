import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./home";
import { ROUTES } from "./routes";

export function Pages() {
  return (
    <Switch>
      <Route exact path={ROUTES.home} component={Home} />
      <Redirect to={ROUTES.home} />
    </Switch>
  );
}
