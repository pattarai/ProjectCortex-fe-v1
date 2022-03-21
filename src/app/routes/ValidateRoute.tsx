import React from 'react';
import { useEffect, useState } from 'react';
import { axiosGet } from '../requests';
import { DashboardLayout } from 'app/pages/DashboardLayout';

export function ValidateRoute(props) {
  const Component = props.component;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let checkUser = async () => {
      let response = await axiosGet(`/auth`);
      if (response.data.success) {
        response.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
      }
    };
    checkUser();
  }, []);

  if (isAdmin) {
    return <Component />;
  } else {
    return <DashboardLayout />;
  }
}
