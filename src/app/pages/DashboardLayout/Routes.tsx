/**
 *
 * Routes
 *
 */
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { About } from '../About/Loadable';
import { Contact } from '../Contact/Loadable';
import { Profileview } from '../Profileview';
import { ProfileCommonView } from '../Profilecommonview';
import { EventPage } from '../EventPage';
import { UserManagement } from '../UserManagement';
import { Attendance } from '../Attendance';

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route exact path="/dashboard/about" component={About} />
      <Route exact path="/dashboard/usermanage" component={UserManagement} />
      <Route exact path="/dashboard/contact" component={Contact} />
      <Route exact path="/dashboard/profile" component={Profileview} />
      <Route exact path="/dashboard/profilecv" component={ProfileCommonView} />
      <Route exact path="/dashboard/events" component={EventPage} />
      <Route exact path="/dashboard/attendance" component={Attendance} />
    </Switch>
  );
}
