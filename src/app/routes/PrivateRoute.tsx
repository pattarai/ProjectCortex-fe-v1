import React, { Props } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { endpoint, axiosGet } from '../requests';
import { Loader } from '../components/Loader';

export function PrivateRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let checkUser = async () => {
      let response = await axiosGet(`/auth`);
      if (response.data.success) {
        setUser(true);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (!user) {
    return <div>You are not logged in</div>;
  } else {
    return <Component />;
  }
}
