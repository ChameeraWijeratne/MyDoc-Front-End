import React, { useState, useEffect } from 'react';
import defaultImg from '../../assest/data/images/default.jpg';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../components/form/Config';
import axios from 'axios';

const AppointmentDetails = ({ appointment }) => {
  const [doctor, setDoctor] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // Fetch doctor details using the docId from appointments
        const response1 = await axios.get(
          `http://localhost:8080/api/v1/doctor/search/${appointment.docId}`
        );
        setDoctor(response1.data);

        // Fetch the download URL for the doctor's profile picture
        const url = await getDownloadURL(
          ref(imageDb, `files/ProPics/${response1.data.profilePic}`)
        );
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [appointment.docId]);

  return (
    <div className="appointment-details">
      <img src={imageUrl || defaultImg} alt="Doctor" />
      <h2>
        Dr. {doctor.firstName} {doctor.lastName}
      </h2>
      <h3>{doctor.doctorCategory}</h3>
      <p>Date: {appointment.appointmentDate}</p>
      <p>Time: {appointment.appointmentTime}</p>
      <p>Number: </p>
    </div>
  );
};

export default AppointmentDetails;
