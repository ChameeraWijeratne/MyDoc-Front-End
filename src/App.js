import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import Register from './pages/Signup/Signup';
import DoctorReg from './pages/DoctorReg/DoctorReg';
import AppontmentReg from './pages/AppointmentReg/AppointmentReg';
import UserReg from './pages/UserReg/UserReg';
import Doctors from './pages/Doctors/Doctors';
import DoctorView from './pages/DoctorView/DoctorView';
import Approvals from './pages/Approvals/Approvals';
import MyAppointmentsPage from './pages/MyAppointments/MyAppointmentsPage';
import MyProfile from './pages/MyProfile/MyProfile';
import ConfirmPage from '../src/components/confirmation/Confirmation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/doctors"
            element={
              <PrivateRoute>
                <Doctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/approvals"
            element={
              <PrivateRoute>
                <Approvals />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor-details/:id"
            element={
              <PrivateRoute>
                <DoctorView />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userreg" element={<UserReg />} />
          <Route path="/docreg" element={<DoctorReg />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/myProfile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/myappointments"
            element={
              <PrivateRoute>
                <MyAppointmentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointmentreg/:id"
            element={
              <PrivateRoute>
                <AppontmentReg />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointmentConfirm"
            element={
              <PrivateRoute>
                <ConfirmPage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
