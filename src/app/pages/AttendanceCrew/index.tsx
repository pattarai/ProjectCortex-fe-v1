// /**
//  *
//  * AttendanceCrew
//  *
//  */
import * as React from 'react';
import { useState, useEffect } from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

export function AttendanceCrew(props: any) {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="d-flex align-justify-center">
            <Card
              elevation={2}
              sx={{
                marginLeft: '50px',
                width: '200%',
              }}
            >
              <div className="d-flex align-justify-center">
                <CardContent sx={{ width: 150, alignItems: 'center' }}>
                  <Typography component="h2" variant="h5">
                    Present
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    disableShrink
                    size={100}
                    thickness={4}
                    value={33}
                    {...props}
                    sx={{ marginTop: '10px' }}
                  />
                  <Typography component="h4" variant="h6">
                    1 out of 6
                  </Typography>
                  <div className="d-flex justify-content-end"></div>
                </CardContent>
              </div>
            </Card>

            <Card
              elevation={2}
              sx={{
                marginLeft: '50px',
                width: '200%',
              }}
            >
              <div className="d-flex align-justify-center">
                <CardContent sx={{ width: 150, alignItems: 'center' }}>
                  <Typography component="h2" variant="h5">
                    Absent
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    disableShrink
                    size={100}
                    thickness={4}
                    value={75}
                    {...props}
                    sx={{ marginTop: '10px' }}
                  />
                  <Typography component="h4" variant="h6">
                    1 out of 6
                  </Typography>
                  <div className="d-flex justify-content-end"></div>
                </CardContent>
              </div>
            </Card>

            <Card
              elevation={2}
              sx={{
                marginLeft: '50px',
                width: '200%',
              }}
            >
              <div className="d-flex align-justify-center">
                <CardContent sx={{ width: 150, alignItems: 'center' }}>
                  <Typography component="h2" variant="h5">
                    On-leave
                  </Typography>
                  <CircularProgress
                    variant="determinate"
                    disableShrink
                    size={100}
                    thickness={4}
                    value={15}
                    {...props}
                    sx={{ marginTop: '10px' }}
                  />
                  <Typography component="h4" variant="h6">
                    1 out of 6
                  </Typography>
                  <div className="d-flex justify-content-end"></div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
