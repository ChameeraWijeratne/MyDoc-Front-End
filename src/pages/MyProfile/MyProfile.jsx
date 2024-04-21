/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate } from 'react-router-dom';
import Topbar from '../../components/ui/topbar/Topbar';
import { useResponseId } from '../../ResponseIdContext';
import axios from 'axios';

import './myProfile.css';
import { useState, useEffect } from 'react';
import defaultImg from '../../assest/data/images/default.jpg';
import MyAppointments from '../MyAppointments/MyAppointments';

export default function myProfile() {
  const { userType, responseId } = useResponseId();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch doctor details
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/search/${responseId}`
        );
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchUserDetails();
  }, [responseId]);

  return (
    <>
      <Topbar />
      <div className="myProfileContent">
        {userType === 'doctor' ? (
          <Navigate to={`/doctor-details/${responseId}`} />
        ) : (
          user && (
            <div className="user-details-All">
              <div className="user-details">
                <div className="user-details-right">
                  <img src={defaultImg} alt="User" />
                </div>
                <div className="user-details-left">
                  <h2>{user.username}</h2>
                  <p>Email : {user.email}</p>
                </div>
              </div>
              <MyAppointments />
            </div>
          )
        )}
      </div>
    </>
  );
}
