import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  MdDashboard as DashboardIcon,
  MdHome as HomeIcon,
  MdCalendarToday as CalendarTodayIcon,
  MdEmojiEvents as EmojiEventsIcon,
  MdEventAvailable as EventAvailableIcon,
  MdExitToApp as ExitToAppIcon,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to={{ pathname: '/dashboard/profile' }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiEventsIcon />
      </ListItemIcon>
      <ListItemText primary="Ranking" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventAvailableIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
