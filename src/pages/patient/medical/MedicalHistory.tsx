import { useState } from "react";
import MedicalReportModal from "../../../components/modal/MedicalReportModal";
import StatusBadge from "../../../components/common/StatusBadge";
import HeaderControls from "../../../components/common/HeaderControls";
function MedicalHistory() {
      const [data, setData] = useState<any>(null);
      const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <HeaderControls/>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className="bg-white rounded-lg flex flex-row items-center justify-between py-4 md:px-8" key={i}>
            <div className="space-y-1">
                <h3 className="text-sm md:text-base ">Thyriod</h3>
                <h4 className="text-xs font-[300]">04 Apr 2025</h4>
            </div>
            <div className="flex items-center space-x-2">
                <h4 className="text-xs font-[300]">Dr Kehlani P.</h4>
            </div>
            <div>
                <StatusBadge status="ongoing"/>
            </div>

            <button className="bg-gray-100 p-1 md:px-4 md:py-3 rounded-lg text-xs font-light text-primary"
              onClick={() => {setData({}); setModalOpen(true)}}
              >
                View details
              </button>
          </div>
        ))}
        <MedicalReportModal data={data} isModalOpen={isModalOpen} setModalOpen={(e)=>{setModalOpen(e)}} />
      </div>
    </div>
  );
}

export default MedicalHistory;
