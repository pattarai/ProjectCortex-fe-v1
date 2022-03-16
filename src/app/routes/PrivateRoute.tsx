import React from 'react';
import { useEffect, useState } from 'react';
import { axiosGet } from '../requests';
import { Loader } from '../components/Loader';
import { Redirect } from 'react-router-dom';

export function PrivateRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let checkUser = async () => {
      let response = await axiosGet(`/auth`);
      if (response.data.success) {
        setUser(true);
        if (response.data.user.isCompleted) {
          setIsCompleted(true);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (!user) {
    return <div>You are not logged in</div>;
  } else if (!isCompleted) {
    return <Redirect to="/dashboard/complete-profile" />;
  } else {
    return <Component />;
  }
}
