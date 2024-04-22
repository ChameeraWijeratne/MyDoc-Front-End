import React from 'react';
import approve from '../../assest/data/images/approve1.png';
import mail from '../../assest/data/images/mail.png';
import { FaCalendarCheck } from 'react-icons/fa';
import './confirmation.css';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/myappointments');
  };

  return (
    <div>
      <div>
        <h5 className="desc_1">Appointment Scheduled Successfully!</h5>
      </div>

      <div>
        <img className="img_styl_1" src={approve} alt="Approval" />
        <p className="desc_1_sm">Please Check Your Mail For Link.</p>
        <img className="img_styl_2" src={mail} alt="mail" />
      </div>

      <button className="desc_2" onClick={handleButtonClick}>
        <FaCalendarCheck />
        View Appointment
      </button>
    </div>
  );
};

export default Confirmation;
