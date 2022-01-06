import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import {
  MdDashboard,
  MdCalendarToday,
  MdEmojiEvents,
  MdExitToApp,
  MdEventAvailable,
} from 'react-icons/md';

export const mainListItems = (
  <div>
    <Link to={{ pathname: '/dashboard/profile' }}>
      <ListItem button>
        <ListItemIcon>
          <MdDashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <AiFillHome />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MdCalendarToday />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MdEmojiEvents />
      </ListItemIcon>
      <ListItemText primary="Ranking" />
    </ListItem>
    <Link to={{ pathname: '/dashboard/events' }}>
      <ListItem button>
        <ListItemIcon>
          <MdEventAvailable />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MdExitToApp />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
