/**
 *
 * Profileview
 *
 */
import * as React from 'react';
// import  Dashboard from './dashboard';
import Img from '../DashboardLayout/subiksha.jpeg';

interface Props {}

export function Profileview(props: Props) {
  return (
    <>
      <section id="profile" className="d-md-flex w-100">
        <img src={Img} height="500px" width="auto" alt="" />
        <div className="px-4 w-100">
          <h1 style={{ color: '#b91d73' }}>Subiksha</h1>
          <h5>Software Engineer</h5>
          <h2>Position</h2>
          <h5>05</h5>
          <h3>Personal Information</h3>
          <h4>College: Loyola Icam College Of Engineering and Technology</h4>
          <h4>Department: Information Technology</h4>
          <h4>Year: III</h4>
          <h4>Roll No: 311119205013</h4>
        </div>
      </section>
    </>
  );
}
