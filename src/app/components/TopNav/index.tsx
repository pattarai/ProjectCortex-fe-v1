/**
 *
 * TopNav
 *
 */
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export function TopNav(props: Props) {
  return (
    <>
      <div>Topnav</div>
      <br />
      <Link to="/dashboard/about">About</Link>
      <Link to="/dashboard/contact">Contact</Link>
    </>
  );
}
