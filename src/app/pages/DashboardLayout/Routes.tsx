/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { About } from '../About/Loadable';
import { Contact } from '../Contact/Loadable';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/about" component={About} />
      <Route exact path="/dashboard/contact" component={Contact} />
    </Switch>
  );
}
