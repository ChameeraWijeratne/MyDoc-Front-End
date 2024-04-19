import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../../src/AuthContext';
import { Navigate } from 'react-router-dom';

import './loginFrm.css';
import { FaLock } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import Logo1 from '../../assest/data/images/Logo1.png';

export const LoginFrm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { login, setAdmin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Determine which table to use based on user type
    const tableName = userType === 'doctor' ? 'doctor' : 'user';

    try {
      // Send a request to the backend to authenticate the user
      const response = await axios.post(
        tableName === 'doctor'
          ? 'http://localhost:8080/api/v1/doctor/login'
          : 'http://localhost:8080/api/v1/user/login',
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        toast.success('Login successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        login();
        setIsLoggedIn(true);

        if (
          email.toLowerCase() === 'admin@gmail.com' &&
          password === 'Admin#123'
        ) {
          setAdmin();
        }

        console.log('Login successful');
      } else {
        // Authentication failed, display error message or take appropriate action
        toast.warning('Invalid email or password.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="toastMsg">
      <ToastContainer />

      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <img src={Logo1} alt="" />
          <h2>Login</h2>

          <div className="input-box">
            <IoIosMail className="icon" />
            <input
              type="email"
              placeholder="Email"
              id="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <select
              name="userType"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select User Type
              </option>
              <option value="doctor">Doctor</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/login">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </div>
      {isLoggedIn && <Navigate to="/doctors" />}
    </div>
  );
};

export default LoginFrm;
