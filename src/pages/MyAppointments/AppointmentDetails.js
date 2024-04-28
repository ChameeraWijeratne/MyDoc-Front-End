import React, { useState, useEffect } from 'react';
import defaultImg from '../../assest/data/images/default.jpg';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../components/form/Config';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './myAppointments.css';
import Swal from 'sweetalert2';

const AppointmentDetails = ({ appointment }) => {
  const [doctor, setDoctor] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [index, setIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // Fetch doctor details using the docId from appointments
        const response1 = await axios.get(
          `http://localhost:8080/api/v1/doctor/search/${appointment.docId}`
        );
        const fetchedDoctor = response1.data;
        console.log(response1.data);
        console.log(appointment._id);
        console.log(appointment.docId);
        console.log(appointment.userId);
        console.log(appointment.appointmentDate);
        console.log(appointment.appointmentTime);

        const responseIndex = await axios.get(
          `http://localhost:8080/api/v1/appointment/getIndex`,
          {
            params: {
              Id: appointment._id,
              docId: appointment.docId,
              userId: appointment.userId,
              appointmentDate: appointment.appointmentDate,
              appointmentTime: appointment.appointmentTime,
            },
          }
        );

        setIndex(responseIndex.data);
        console.log(responseIndex.data);

        if (fetchedDoctor) {
          setDoctor(fetchedDoctor);

          // Fetch the download URL for the doctor's profile picture
          const url = await getDownloadURL(
            ref(imageDb, `files/ProPics/${fetchedDoctor.profilePic}`)
          );
          setImageUrl(url);
        } else {
          console.error('Doctor details not found.');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    if (appointment.docId) {
      fetchDoctorDetails();
    }
  }, [
    appointment._id,
    appointment.docId,
    appointment.userId,
    appointment.appointmentDate,
    appointment.appointmentTime,
  ]);

  if (!doctor) {
    // Render a loading state while waiting for doctor details to load
    return <div>Loading...</div>;
  }
  //RAV
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Do you want to Delete this Appointment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const response1 = await axios.delete(
            `http://localhost:8080/api/v1/appointment/delete/${id}`
          ); // Adjust the route based on your backend setup
          console.log(`Deleting doctor with ID ${id}`, response1.data);
          Swal.fire('Deleted!', '', 'info');
          navigate('/doctors');
        } catch (error) {
          console.error('Error Deleting doctor data:', error);
        }
      }
    });
  };

  const handleRating = async (id) => {
    const { value: ratingValue } = await Swal.fire({
      title: 'Enter Rating 1-5',
      input: 'number',
      inputLabel: 'Rating',
      inputPlaceholder: 'Enter your rating 1-5',
      inputAttributes: {
        min: 1,
        max: 5,
        step: 1,
      },
      showCancelButton: true,
    });

    if (ratingValue) {
      // Call API to update appointment with the rating
      const rating = parseInt(ratingValue);

      try {
        await axios.put(
          `http://localhost:8080/api/v1/appointment/editRating/${id}`,
          rating,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        Swal.fire('Rating added successfully!', '', 'success');
      } catch (error) {
        console.error('Error adding rating:', error);
        Swal.fire('Error', 'Failed to add rating', 'error');
      }
    }
  };

  return (
    <div className="appointment-details">
      <div className="appointment-details-right">
        <img src={imageUrl || defaultImg} alt="Doctor" />
      </div>
      <div className="appointment-details-left">
        <h2>
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <h3>{doctor.doctorCategory}</h3>
        <p>Patient Name : {appointment.patientName}</p>
        <p>Date : {appointment.appointmentDate}</p>
        <p>Time : {appointment.appointmentTime}</p>
        <p>Description : {appointment.description}</p>
        <div className="numberData">
          {' '}
          <p>Appointment No : {index}</p>
        </div>

        <div className="btnMyAppointment">
          <button
            className="myAppointmentButton ratingbtn"
            onClick={() => handleRating(appointment._id)}
          >
            Add Rating
          </button>

          <button
            className="myAppointmentButton"
            onClick={() => handleDelete(appointment._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
