import Topbar from '../../components/ui/topbar/Topbar';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../components/form/Config';
import defaultImg from '../../assest/data/images/default.jpg';
import axios from 'axios';

import './doctorView.css';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch doctor details using the ID
    // Example: You might fetch the doctor's details from your backend server or database
    // Replace the fetchDoctorDetails function with your actual data fetching logic
    const fetchDoctorDetails = async () => {
      try {
        // Fetch doctor details
        const response = await axios.get(
          `http://localhost:8080/api/v1/doctor/search/${id}`
        );
        const doctorData = response.data;
        setDoctor(doctorData);

        const url = await getDownloadURL(
          ref(imageDb, `files/ProPics/${doctorData.profilePic}`)
        );
        setImageUrl(url);

        const appointmentResponse = await axios.get(
          `http://localhost:8080/api/v1/appointment/searchDocAppointments/${id}`
        );
        setAppointments(appointmentResponse.data);
        calculateAverageRating(id);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
    setDateFilter(getTodayDate());
  }, [id]);

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  // Function to handle time filter change
  const handleTimeChange = (e) => {
    setTimeFilter(e.target.value);
  };

  useEffect(() => {
    let filtered = appointments;
    if (dateFilter) {
      filtered = filtered.filter(
        (appointment) => appointment.appointmentDate === dateFilter
      );
    }
    if (timeFilter) {
      filtered = filtered.filter(
        (appointment) => appointment.appointmentTime === timeFilter
      );
    }
    setFilteredAppointments(filtered);
  }, [appointments, dateFilter, timeFilter]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateDateOptions = () => {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      options.push(
        <option key={formattedDate} value={formattedDate}>
          {formattedDate}
        </option>
      );
    }
    return options;
  };

  const calculateAverageRating = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/appointment/averageRating/${doctorId}`
      );
      setAverageRating(response.data);
    } catch (error) {
      console.error('Error calculating average rating:', error);
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar />
      <div className="doctorDetails">
        <div className="doctorDetailsData-left">
          <img src={imageUrl || defaultImg} alt="Doctor" />
          <p>
            Average Rating :{' '}
            {Array.from({ length: Math.round(averageRating) }, (_, index) => (
              <span key={index}>★</span>
            ))}{' '}
            ({averageRating})
          </p>
        </div>
        <div className="doctorDetailsData">
          <h2>
            Dr. {doctor.firstName} {doctor.lastName}
          </h2>
          <h3>{doctor.doctorCategory}</h3>
          <p>City: {doctor.city}</p>
          <p>Email: {doctor.email}</p>
          <p>Contact Number: (+94) {doctor.contactNumber}</p>
          <p>
            Location: <br />
            {doctor.addressLine1}, {doctor.addressLine2}, {doctor.city} (
            {doctor.postalCode})
          </p>

          <Link to={`/appointmentreg/${id}`}>
            <button className="appontmentButton">Add Appointment</button>
          </Link>
        </div>
      </div>
      <div className="filterDateandTime">
        <select value={dateFilter} onChange={handleDateChange}>
          {generateDateOptions()}
        </select>

        <select value={timeFilter} onChange={handleTimeChange}>
          <option value="8.00AM" selected>
            8.00 AM
          </option>
          <option value="4.00PM">4.00 PM</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.description}</td>
              {/* Add more table cells for other appointment details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDetails;
