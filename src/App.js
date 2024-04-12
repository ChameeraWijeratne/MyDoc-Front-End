import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import Register from './pages/Signup/Signup';
import DoctorReg from './pages/DoctorReg/DoctorReg';
import UserReg from './pages/UserReg/UserReg';
import Doctors from './pages/Doctors/Doctors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/docreg" element={<DoctorReg />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </Router>
  );
}

export default App;
