/**
 *
 * DashboardLayout
 *
 */
// import { TopNav } from 'app/components/TopNav/Loadable';
import * as React from 'react';
import { Routes } from './Routes';
import Dashboard from './Dashboard';

interface Props {}

export function DashboardLayout(props: Props) {
  return (
    <>
      <Dashboard>
        <Routes />
      </Dashboard>
      {/* <TopNav /> */}
    </>
  );
}
