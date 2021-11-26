/**
 *
 * DashboardLayout
 *
 */
// import { TopNav } from 'app/components/TopNav/Loadable';
import * as React from 'react';
import { Routes } from './Routes';

interface Props {}

export function DashboardLayout(props: Props) {
  return (
    <div>
      {/* <TopNav /> */}
      <Routes />
    </div>
  );
}
