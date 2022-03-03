/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Contact } from '../Contact/Loadable';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/contact" component={Contact} />
    </Switch>
  );
}
