import React, { useState, useEffect } from 'react';
import './doctorList.css';
import { DoctorItem } from '../ui/DoctorItem/DoctorItem';
import { useAuth } from '../../../src/AuthContext';
import axios from 'axios';
import CategorySelector from './DoctorCategory';
import Swal from 'sweetalert2';

export const DoctorList = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/doctor/getAll'
      ); // Adjust the route based on your backend setup
      setDoctorData(response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUnapprove = async (id) => {
    Swal.fire({
      title: 'Do you want to deactivate this doctor?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const docData = await axios.get(
            `http://localhost:8080/api/v1/doctor/search/${id}`
          );

          const doc = docData.data;

          const response1 = await axios.post(
            `http://localhost:8080/api/v1/doctor/deactivate/${id}`
          );
          console.log(`Deactivated doctor with ID ${id}`, response1.data);
          Swal.fire('Deactivated!', '', 'success');
          const emailData = {
            to: doc.email,
            docFname: doc.firstName,
            docLname: doc.lastName,
            appNo: null,
            appDate: null,
            appTime: null,
            appDesc:
              'Your Account temporary deactivated due to some reasons, sorry for the inconvenience.',
          };

          const responseMail = await axios.post(
            `http://localhost:8080/api/v1/email/sendApprovalEmail`,
            emailData
          );

          console.log(responseMail.data);
        } catch (error) {
          console.error('Error approving doctor data:', error);
        }
      }
    });
  };

  const filteredDoctors =
    selectedCategory === ''
      ? doctorData.filter((doctor) => doctor.activate)
      : doctorData.filter(
          (doctor) =>
            doctor.doctorCategory === selectedCategory && doctor.activate
        );

  return (
    <div className="doctor-list">
      <h1>Doctors</h1>
      <hr />
      <CategorySelector
        categories={[
          'General Practitioner',
          'Pediatrician',
          'Cardiologist',
          'Dermatologist',
          'Neurologist',
        ]}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <div className="doctor-item">
        {filteredDoctors.map((item, i) => {
          return (
            <div key={i}>
              <DoctorItem
                key={i}
                id={item._id}
                name={'Dr. ' + item.firstName + ' ' + item.lastName}
                image={item.profilePic}
                category={item.doctorCategory + ' (MBBS ' + item.mbbsId + ')'}
                city={item.city}
              />
              {isAdmin && (
                <button
                  className="btn-deactivate"
                  onClick={() => handleUnapprove(item._id)}
                >
                  Deactivate
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
