/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Switch } from 'react-router';
import { EventPage } from '../EventPage';
import { UserManagement } from '../UserManagement';
import { ProfileView } from '../ProfileView';
import { ProfileCommonView } from '../ProfileCommonView';
import { Attendance } from '../Attendance';
import { AttendanceCrew } from '../AttendanceCrew';
import { RankingAdmin } from '../RankingAdmin';
import { RankingCrew } from '../Ranking';

import { UserRoute } from 'app/routes/UserRoute';
import { AdminRoute } from 'app/routes/AdminRoute';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <UserRoute
        exact
        path="/dashboard/attendance"
        component={AttendanceCrew}
      />
      <UserRoute exact path="/dashboard/ranking" component={RankingCrew} />
      <UserRoute path="/dashboard/profilecv" component={ProfileCommonView} />
      <UserRoute path="/dashboard/profile" component={ProfileView} />
      <AdminRoute
        exact
        path="/dashboard/admin/user-manage"
        component={UserManagement}
      />
      <AdminRoute exact path="/dashboard/admin/events" component={EventPage} />
      <AdminRoute path="/dashboard/admin/ranking" component={RankingAdmin} />
      <AdminRoute
        exact
        path="/dashboard/admin/attendance"
        component={Attendance}
      />
    </Switch>
  );
}
