import React from 'react';
import { useEffect, useState } from 'react';
import { axiosGet } from '../requests';
import { Loader } from '../components/Loader';
import { CompleteProfile } from 'app/pages/CompleteProfile';

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
        response.data.isCompleted
          ? setIsCompleted(true)
          : setIsCompleted(false);
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
    if (isCompleted) {
      return <Component />;
    } else {
      return <CompleteProfile />;
    }
  }
}
