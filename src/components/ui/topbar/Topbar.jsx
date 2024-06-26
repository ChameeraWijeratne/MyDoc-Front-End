import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '.././../../AuthContext';

import './topbar.css';
import { AccountCircle, CircleNotifications } from '@mui/icons-material';
import { useResponseId } from '../../../ResponseIdContext';

export default function Topbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { propicUrl } = useResponseId();

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
              <Link to="/">Home</Link>
            </span>
          </div>

          {isLoggedIn && (
            <>
              {isAdmin && (
                <>
                  <div className="topbarListItem">
                    <span className="sidebarListItemText">
                      <Link to="/approvals">Approvals</Link>
                    </span>
                  </div>
                  <div className="topbarListItem">
                    <span className="sidebarListItemText">
                      <Link to="/signup">Register</Link>
                    </span>
                  </div>
                </>
              )}
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
            </>
          )}
          <div className="topbarListItem">
            <span className="sidebarListItemText">
              <Link to="/contactus">Contact Us</Link>
            </span>
          </div>
          {!isLoggedIn && (
            <>
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
            </>
          )}
          {isLoggedIn && (
            <>
              <div className="topbarListItem">
                <span className="sidebarListItemText">
                  <button className="btnLogout" onClick={logout}>
                    Logout
                  </button>
                </span>
              </div>
            </>
          )}
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Link to="/myProfile">
                {propicUrl ? (
                  <img src={propicUrl} alt="Profile" />
                ) : (
                  <AccountCircle />
                )}{' '}
              </Link>
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
