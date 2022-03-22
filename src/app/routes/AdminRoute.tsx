import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { axiosGet } from '../requests';
import { Loader } from 'app/components/Loader';
import Problem from 'app/components/Problem';
import { CompleteProfile } from 'app/pages/CompleteProfile';

export function AdminRoute(props) {
  const Component = props.component;
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  async function checkUser() {
    try {
      const response = await axiosGet(`/auth`);
      if (response.data.success) {
        setUser(true);
        response.data.isAdmin && setIsAdmin(true);
        response.data.isCompleted && setIsCompleted(true);
      }
    } catch (err: any) {
      if (err.response.status === 500) {
        setError(true);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Problem isError={true} />;
  } else if (!user) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    if (isCompleted) {
      if (isAdmin) {
        return <Component />;
      } else {
        return <Redirect to={{ pathname: '/' }} />;
      }
    } else {
      return <CompleteProfile />;
    }
  }
}
