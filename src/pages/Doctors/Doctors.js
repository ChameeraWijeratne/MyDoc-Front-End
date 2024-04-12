import './doctors.css';
import Topbar from '../../components/ui/topbar/Topbar';
import { DoctorList } from '../../components/Doctors/DoctorList';

export default function Doctors() {
  return (
    <>
      <Topbar />
      <div className="homeContent">
        <div className="homeBody">
          <div className="docList">
            <DoctorList />
          </div>
        </div>
      </div>
    </>
  );
}
