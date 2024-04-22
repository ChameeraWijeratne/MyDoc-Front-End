import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useResponseId } from '../../ResponseIdContext';

import axios from 'axios';
import './userRegFrm.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Logo from './../../assest/data/images/Logo.png';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
/>;

export const AppointmentRegFrm = () => {
  const { id } = useParams();
  const { responseId, userType } = useResponseId();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    docId: id || '',
    userId: responseId || '',
    patientName: '',
    appointmentDate: '',
    appointmentTime: '',
    description: '',
    rating: 0,
  });

  console.log(responseId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/appointment/save',
        formData
      );

      const responseDoc = await axios.get(
        `http://localhost:8080/api/v1/doctor/search/${id}`
      );

      let responseUser;
      if (userType === 'doctor') {
        responseUser = await axios.get(
          `http://localhost:8080/api/v1/doctor/search/${formData.userId}`
        );
      } else {
        responseUser = await axios.get(
          `http://localhost:8080/api/v1/user/search/${formData.userId}`
        );
      }
      console.log(responseUser.data);

      const userData = responseUser.data;
      const email = userData.email;

      const responseAppointmentNo = await axios.get(
        `http://localhost:8080/api/v1/appointment/getIndex`,
        {
          params: {
            Id: response.data,
            docId: id,
            userId: responseId,
            appointmentDate: formData.appointmentDate,
            appointmentTime: formData.appointmentTime,
          },
        }
      );

      const appNo = responseAppointmentNo.data;
      const appDate = formData.appointmentDate;
      const appTime = formData.appointmentTime;
      const appDesc = formData.description;
      const doc = responseDoc.data;
      const docFname = doc.firstName;
      const docLname = doc.lastName;

      const emailData = {
        to: email,
        docFname: docFname,
        docLname: docLname,
        appNo: appNo,
        appDate: appDate,
        appTime: appTime,
        appDesc: appDesc,
      };

      const responseMail = await axios.post(
        `http://localhost:8080/api/v1/email/sendAppConfirmEmail`,
        emailData
      );

      console.log(responseMail.data);

      console.log(response.data);
      navigate('/appointmentConfirm');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Error submitting appointment. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Set the minimum and maximum selectable dates
    const today = getTodayDate();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    const sevenDaysLaterString = sevenDaysLater.toISOString().split('T')[0];

    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
      dateInput.setAttribute('min', today);
      dateInput.setAttribute('max', sevenDaysLaterString);
    }
  }, []);

  return (
    <div className="container user-reg-container">
      <img className="user-img" src={Logo} alt="" />
      <header className="user-header">Appointment Registration</header>
      <form onSubmit={handleSubmit}>
        <div className="user-form form first">
          <div className="details personal">
            <div className="fields">
              <div className="input-field user-input-field">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  id="appointmentDate" // Add id for targeting
                  placeholder="Appontment Date"
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentDate: e.target.value,
                    })
                  }
                  required
                />
                <select
                  className="appontmentTimeSelec"
                  type="text"
                  placeholder="Time"
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentTime: e.target.value,
                    })
                  }
                  required
                >
                  <option value="" disabled selected>
                    Select Time
                  </option>
                  <option value="8.00AM">8.00 AM</option>
                  <option value="4.00PM">4.00 PM</option>
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="user-form form fourth">
          <div className="details submit">
            <div className="fields">
              <div className="input-field user-input-field"></div>
              <button className="nextBtn user-frm-btn" type="submit">
                <span className="btnText">Register</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentRegFrm;
