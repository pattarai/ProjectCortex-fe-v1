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
    <Link
      to={{ pathname: '/dashboard/profile' }}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link
      to={{ pathname: '/dashboard/profilecv' }}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Crew" />
      </ListItem>
    </Link>
    <Link
      to={{ pathname: '/dashboard/attendance' }}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItem>
    </Link>
    <Link
      to={{ pathname: '/dashboard/ranking' }}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="Ranking" />
      </ListItem>
    </Link>
    <Link
      to={{ pathname: '/dashboard/events' }}
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon>
          <EventAvailableIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem
      button
      onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/';
      }}
    >
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
