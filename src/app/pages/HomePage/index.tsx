import { Button } from '@mui/material';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  var testVar;
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>
      <Button variant="contained">Contained</Button>
    </>
  );
}
