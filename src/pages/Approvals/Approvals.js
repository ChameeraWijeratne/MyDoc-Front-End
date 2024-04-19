import './approvals.css';
import Topbar from '../../components/ui/topbar/Topbar';
import { ApprovalList } from '../../components/Approvals/ApprovalsList';

export default function Approvals() {
  return (
    <>
      <Topbar />
      <div className="approveContent">
        <div className="approvalList">
          <ApprovalList />
        </div>
      </div>
    </>
  );
}
