import Modal from "./modal";
import { FaFilePdf } from "react-icons/fa6";
import StatusBadge from "../common/StatusBadge";
type MedicalReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};
function MedicalReportModal({
  isModalOpen,
  setModalOpen,
}: MedicalReportModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Medical Report Details"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0 "
        buttonText="Download"
      >
        <div>

          <main className="min-h-[200px]">
            {[1].map((i) => (
          <div className=" flex flex-col gap-4 py-4 " key={i}>
            <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-[300]">Diagnosis</h4>
                <h3 className="text-sm text-text-primary ">Hepatitis B</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-[300]">Diagnosis Type</h4>
                <h3 className="text-sm   text-text-primary ">Acute</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-[300]">Date Diagnosed</h4>
                <h3 className="text-sm   text-text-primary ">April 26, 2025</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm font-[300]">Status</h4>
                <h3 className="text-sm  text-text-primary  "><StatusBadge status="ongoing"/></h3>
            </div>

            <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-[300]">Doctor's Note</h4>
                <h3 className="text-sm  text-text-primary  mb-4 ">Stomach</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-sm text-text-secondary font-[300]">Attachment</h4>
                <button className="text-white bg-red-600 font-base flex items-center py-2 px-4 gap-2 rounded-md">
                 <FaFilePdf/>   Diagnosis.pdf
                </button>
            </div>
          </div>
        ))}
          </main>
        </div>
      </Modal>
    </div>
  );
}

export default MedicalReportModal;
