import React from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';
import { AccountCircle, CircleNotifications } from '@mui/icons-material';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">MyDoctor</span>
      </div>
      <div className="topbarCenter"></div>
      <div className="topbarMiddle">
        <div className="menuIcons">
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/doctors">Doctors</Link>
            </span>
          </div>
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/myappointments">My Appointments</Link>
            </span>
          </div>
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/signup">Register</Link>
            </span>
          </div>
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/login">Log In</Link>
            </span>
          </div>
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/">Home</Link>
            </span>
          </div>
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/contactus">Contact Us</Link>
            </span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <AccountCircle />
            </div>
            <div className="topbarIconItem">
              <CircleNotifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
