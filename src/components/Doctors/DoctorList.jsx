import React, { useState, useEffect } from 'react';
import './doctorList.css';
import { DoctorItem } from '../ui/DoctorItem/DoctorItem';
import axios from 'axios';
import CategorySelector from './DoctorCategory';

export const DoctorList = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
            <DoctorItem
              key={i}
              id={item._id}
              name={'Dr. ' + item.firstName + ' ' + item.lastName}
              image={item.profilePic}
              category={item.doctorCategory + ' (MBBS ' + item.mbbsId + ')'}
              city={item.city}
            />
          );
        })}
      </div>
    </div>
  );
};
