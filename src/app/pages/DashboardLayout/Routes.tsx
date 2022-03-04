/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { EventPage } from '../EventPage';
import { UserManagement } from '../UserManagement';
import { Attendance } from '../Attendance';
import { AttendanceCrew } from '../AttendanceCrew';
import { Ranking } from '../Ranking';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/attendance" component={AttendanceCrew} />
      <Route exact path="/dashboard/ranking" component={Ranking} />

      <Route exact path="/dashboard/admin/events" component={EventPage} />
      <Route
        exact
        path="/dashboard/admin/user-manage"
        component={UserManagement}
      />
      <Route exact path="/dashboard/admin/attendance" component={Attendance} />
    </Switch>
  );
}
