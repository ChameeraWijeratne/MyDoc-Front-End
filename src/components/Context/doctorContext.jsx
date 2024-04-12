import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DoctorContext = createContext(null);

const DoctorContextProvider = (props) => {
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const contextValue = await axios.get(
        'http://localhost:8080/api/v1/doctor/getAll'
      ); // Adjust the route based on your backend setup
      setDoctorsData(contextValue.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };
  return (
    <DoctorContext.Provider value={doctorsData}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
