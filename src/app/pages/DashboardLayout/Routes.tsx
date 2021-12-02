/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { About } from '../About/Loadable';
import { Contact } from '../Contact/Loadable';
import { UserManagement } from '../UserManagement';
import { Attendance } from '../Attendance';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/about" component={About} />
      <Route exact path="/dashboard/user-manage" component={UserManagement} />
      <Route exact path="/dashboard/contact" component={Contact} />
      <Route exact path="/dashboard/attendance" component={Attendance} />
    </Switch>
  );
}
