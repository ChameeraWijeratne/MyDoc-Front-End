import './approvals.css';
import Topbar from '../../components/ui/topbar/Topbar';
import { ApprovalList } from '../../components/Approvals/ApprovalsList';

export default function Approvals() {
  return (
    <>
      <Topbar />
      <div className="homeContent">
        <div className="homeBody">
          <div className="approvalList">
            <ApprovalList />
          </div>
        </div>
      </div>
    </>
  );
}
