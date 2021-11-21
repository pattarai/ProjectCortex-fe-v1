/**
 *
 * DashboardLayout
 *
 */
// import { TopNav } from 'app/components/TopNav/Loadable';
import * as React from 'react';
import { Routes } from './Routes';
import Dashboard from './dashboard';
import { Profileview } from '../Profileview';

interface Props {}

export function DashboardLayout(props: Props) {
  return (
    <div>
      <Dashboard>
        <Routes />
      </Dashboard>
      {/* <TopNav /> */}
      <Routes />
    </div>
  );
}
