/**
 *
 * EventsCrewPage
 *
 */
import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {}

export function EventsCrewPage(props: Props) {
  return (
    <>
      <div className=" d-flex align-justify-center">
        <div>
          <CircularProgress
            variant="determinate"
            disableShrink
            size={100}
            thickness={4}
            value={33}
            {...props}
          />
        </div>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
