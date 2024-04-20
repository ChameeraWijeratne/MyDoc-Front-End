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
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar />
      <div className="doctorDetails">
        <img src={imageUrl || defaultImg} alt="Doctor" />
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
          <Link to={`/appointmentreg`}>
            <button className="appontmentButton">Add Appointment</button>
          </Link>
        </div>
      </div>

      {/* Display other doctor details as needed */}
    </div>
  );
};

export default DoctorDetails;
