import React, { Props } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { endpoint } from '../requests';

export function PrivateRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let checkUser = async () => {
      let token = localStorage.getItem('token');
      let response = await axios.request({
        method: 'GET',
        url: `${endpoint}/auth`,
        headers: { Authorization: `Bearer ${token}` },
      });
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
