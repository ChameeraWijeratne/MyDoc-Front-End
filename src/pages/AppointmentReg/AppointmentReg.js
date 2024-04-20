import Topbar from '../../components/ui/topbar/Topbar';
import AppointmentRegFrm from '../../components/form/AppointmentRegFrm';
import './appointmentReg.css';

export default function DoctorReg() {
  return (
    <>
      <Topbar />
      <div className="AppointmentContent">
        <div className="AppointmentRegForm">
          <AppointmentRegFrm />
        </div>
        <div className="AppointmentBody"></div>
      </div>
    </>
  );
}
