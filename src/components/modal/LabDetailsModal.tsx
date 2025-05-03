import Modal from "./modal";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { IoDocumentText } from "react-icons/io5";
import StatusBadge from "../common/StatusBadge";
type LabDetailsModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};
function LabDetailsModal({
  isModalOpen,
  setModalOpen,
}: LabDetailsModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Treatment For Hepatitis"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0 "
        buttonText="Download Report"
      >
        <div>
          <div className=" rounded-sm p-2 flex flex-col md:flex-row  items-center gap-2">
            <div className="w-20 h-20 md:w-28 md:h-28 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-base ">Prescribed By</h4>
              <h4 className="text-xs ">Dr Herr Jones</h4>
              <h4 className="text-xs ">#1242363</h4>
              <button className="flex flex-row items-center py-1 px-3  bg-[#792CFF1A] text-[#792CFF] text-[10px] rounded-sm">
                <FaClock className="mr-1" /> {"12:00 - 13:00"}
              </button>
              <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center py-1 px-4  bg-[#00B2FF1A] text-[#00B2FF] text-[10px] rounded-full">
                  <TbLocation className="mr-1" /> Hospital Location
                </button>
              </div>
            </div>
          </div>
          <main className="min-h-[200px]">
            <h4 className="text-sm  my-2">Latest Reports </h4>
            {[1, 2].map((i) => (
              <div className=" flex flex-row items-center justify-between py-4 " key={i}>
                <div className="space-y-1">
                  <h4 className="text-sm  font-[300]">Test Name</h4>
                  <h3 className="text-sm  ">Hepaptits</h3>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm  font-[300]">Date Requested</h4>
                  <h3 className="text-sm   ">April 25, 2025</h3>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm  font-[300]">Status</h4>
                  <StatusBadge status="ongoing" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-[300]">Test Result</h4>
                  <button className="bg-gray-100 p-1 md:px-3 md:py-1 rounded-xs text-[10px] font-light text-primary flex items-center">
                    <IoDocumentText className="mr-1" />
                    View Document
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

export default LabDetailsModal;
