import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentDetails from './AppointmentDetails';
import './myAppointments.css';
import { useResponseId } from '../../ResponseIdContext';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const { responseId } = useResponseId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/appointment/searchUser/${responseId}`
        );
        setAppointments(response.data);
        console.log('appointment data:', response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, [responseId]);

  const filteredAppointments = Array.isArray(appointments)
    ? appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return appointmentDate > yesterday;
      })
    : [];

  return (
    <div>
      <div className="my-appointments">
        <h1>My Appointments</h1>
        <div className="appointment-cards">
          {filteredAppointments.map((appointment, index) => {
            return <AppointmentDetails key={index} appointment={appointment} />;
          })}
        </div>
      </div>
    </div>
  );
}
