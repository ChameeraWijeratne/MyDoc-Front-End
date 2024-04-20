import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './userRegFrm.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Logo from './../../assest/data/images/Logo.png';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
/>;

export default function AppointmentRegFrm() {
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    patientName: '',
    date: '',
    time: '',
    description: '',
  });

  const handleSubmit = async (event) => {
    // Your existing submission logic...

    // Add appointment submission logic here
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/appointment/save',
        formData
      );

      // Handle the response from the backend
      console.log(response.data);

      toast.success('Appointment submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect or do other actions after successful submission
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
      <ToastContainer />
      <form onSubmit={handleSubmit} action="#">
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
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
                <select
                  className="appontmentTimeSelec"
                  type="text"
                  placeholder="Time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
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
        {/* Repeat similar structures for other input fields */}
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
}
