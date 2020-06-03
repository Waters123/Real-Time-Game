import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Join from './join';
import Game from './game';
import { ROUTES } from './routes';

export function Pages() {
  return (
    <Switch>
      <Route exact path={ROUTES.join} component={Join} />
      <Route exact path={ROUTES.game} component={Game} />
      <Redirect to={ROUTES.join} />
    </Switch>
  );
}
