import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '75%',
        }}
      >
        <LinearProgress
          sx={{
            backgroundColor: '#fff',
            // color: '#000',
          }}
        />
      </Box>
    </Box>
  );
}
