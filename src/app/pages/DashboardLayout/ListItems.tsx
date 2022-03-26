import React, { useState, useEffect } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  MdDashboard as DashboardIcon,
  MdHome as HomeIcon,
  MdCalendarToday as CalendarTodayIcon,
  MdEmojiEvents as EmojiEventsIcon,
  MdEventAvailable as EventAvailableIcon,
  MdExitToApp as ExitToAppIcon,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { BsJournalMedical } from 'react-icons/bs';
import { GiRank3 } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { axiosGet } from 'app/requests';

export const MainListItems = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  async function checkUser() {
    try {
      const response = await axiosGet(`/auth`);
      if (response.data.success) {
        response.data.isAdmin && setIsAdmin(true);
      }
    } catch (err: any) {}
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
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

      {isAdmin && (
        <>
          <Link
            to={{ pathname: '/dashboard/admin/user-manage' }}
            style={{ textDecoration: 'none' }}
          >
            <ListItem button>
              <ListItemIcon>
                <MdOutlineManageAccounts />
              </ListItemIcon>
              <ListItemText primary="Manage Crew" />
            </ListItem>
          </Link>
          <Link
            to={{ pathname: '/dashboard/admin/events' }}
            style={{ textDecoration: 'none' }}
          >
            <ListItem button>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Events" />
            </ListItem>
          </Link>
          <Link
            to={{ pathname: '/dashboard/admin/ranking' }}
            style={{ textDecoration: 'none' }}
          >
            <ListItem button>
              <ListItemIcon>
                <GiRank3 />
              </ListItemIcon>
              <ListItemText primary="Manage Ranking" />
            </ListItem>
          </Link>
          <Link
            to={{ pathname: '/dashboard/admin/attendance' }}
            style={{ textDecoration: 'none' }}
          >
            <ListItem button>
              <ListItemIcon>
                <BsJournalMedical />
              </ListItemIcon>
              <ListItemText primary="Manage Attendance" />
            </ListItem>
          </Link>
        </>
      )}
    </>
  );
};

export const secondaryListItems = (
  <>
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
  </>
);
