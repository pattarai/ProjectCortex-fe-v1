import React, { Props } from 'react';
import { axiosGet } from '../requests';
import { useEffect, useState } from 'react';

export function PrivateRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let checkUser = async () => {
      let response = await axiosGet('/auth');
      console.log(response);
      if (response.data.success) {
        setUser(true);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!user) {
    return <div>You are not logged in</div>;
  } else {
    return <Component />;
  }
}
