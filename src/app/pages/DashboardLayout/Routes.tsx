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

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/usermanage" component={UserManagement} />
      <Route exact path="/dashboard/events" component={EventPage} />
      <Route exact path="/dashboard/admin/attendance" component={Attendance} />
      <Route
        exact
        path="/dashboard/users/attendance"
        component={AttendanceCrew}
      />
    </Switch>
  );
}
