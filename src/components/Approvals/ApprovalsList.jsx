import React, { useState, useEffect } from 'react';
import './approvalsList.css';
import { ApprovalItem } from '../ui/ApproveItem/ApprovalItem';
import axios from 'axios';
import Swal from 'sweetalert2';

export const ApprovalList = () => {
  const [approvalData, setApprovalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/doctor/getAll'
      );
      setApprovalData(response.data);
      console.log('Response data :', response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const filteredDoctorApprovals = approvalData.filter(
    (approval) => !approval.activate
  );

  const handleApprove = async (id) => {
    Swal.fire({
      title: 'Do you want to approve this doctor?',
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
            `http://localhost:8080/api/v1/doctor/activate/${id}`
          );
          console.log(`Approving doctor with ID ${id}`, response1.data);
          Swal.fire('Approved!', '', 'success');
          const emailData = {
            to: doc.email,
            docFname: doc.firstName,
            docLname: doc.lastName,
            appNo: null,
            appDate: null,
            appTime: null,
            appDesc: 'Congaratulations!!!! , Your Account Approved.',
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

  const handleDecline = async (id) => {
    Swal.fire({
      title: 'Do you want to decline this doctor?',
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

          const response1 = await axios.delete(
            `http://localhost:8080/api/v1/doctor/delete/${id}`
          );
          console.log(`Deleting doctor with ID ${id}`, response1.data);
          Swal.fire('Declined!', '', 'info');

          const emailData = {
            to: doc.email,
            docFname: doc.firstName,
            docLname: doc.lastName,
            appNo: null,
            appDate: null,
            appTime: null,
            appDesc:
              'Your Account Declined, Please add correct informations and Register again.',
          };

          const responseMail = await axios.post(
            `http://localhost:8080/api/v1/email/sendApprovalEmail`,
            emailData
          );

          console.log(responseMail.data);
        } catch (error) {
          console.error('Error Deleting doctor data:', error);
        }
      }
    });
  };

  return (
    <div className="approval-list">
      <h1>Doctor Approvals</h1>
      <hr />
      <div className="approve-item">
        {filteredDoctorApprovals.map((item, i) => {
          return (
            <div key={i}>
              <ApprovalItem
                key={i}
                id={item._id}
                name={'Dr. ' + item.firstName + ' ' + item.lastName}
                image={item.profilePic}
                category={item.doctorCategory + ' (MBBS ' + item.mbbsId + ')'}
                city={item.city}
                certificate={item.mbbsCertificate}
              />
              <div className="btn">
                <button onClick={() => handleApprove(item._id)}>Approve</button>
                <button
                  className="btnCancel"
                  onClick={() => handleDecline(item._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
