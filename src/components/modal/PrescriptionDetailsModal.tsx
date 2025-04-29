import Modal from "./modal";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { Link } from "react-router-dom";
type PrescriptionDetailsModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};
function PrescriptionDetailsModal({
  isModalOpen,
  setModalOpen,
  data,
}: PrescriptionDetailsModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Treatment For Hepatitis"
        hideCancel={false}
        style="!max-w-2xl !mx-4 !md:mx-0 "
        buttonText="Purchase drugs"
      >
        <div>
          <div className=" rounded-sm p-2 flex flex-row  items-center gap-2">
            <div className="w-28 h-28 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div  className="space-y-1">
                <h4 className="text-base font-[500]">Prescribed By</h4>
                <h4 className="text-xs ">Dr Herr Jones</h4>
                <h4 className="text-xs ">#1242363</h4>
                <button className="flex flex-row items-center py-1 px-3  bg-[#792CFF1A] text-[#792CFF] text-[10px] rounded-sm"><FaClock className="mr-1"/> {'12:00 - 13:00'}</button>
                <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center py-1 px-4  bg-[#00B2FF1A] text-[#00B2FF] text-[10px] rounded-full"><TbLocation className="mr-1"/> Hospital Location</button>
                </div>
              </div>
          </div>
          <main className="min-h-[200px]">
            <h4 className="text-sm  my-2">Drugs List </h4>
            {[1, 2, ].map((i) => (
          <div className=" flex flex-row items-center justify-between py-4 ">
            <div className="space-y-1">
                <h4 className="text-[12px]  font-[300]">Drug Name</h4>
                <h3 className="text-[12px]  font-[500]">Homatrophie - Eye Drop</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-[12px]  font-[300]">Dosage</h4>
                <h3 className="text-[12px]   font-[500]">Homatrophie - Eye Drop</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-[12px]  font-[300]">Frequency</h4>
                <h3 className="text-[12px]   font-[500]">3x/day after meals</h3>
            </div>
            <div className="space-y-1">
                <h4 className="text-[12px] font-[300]">Refill</h4>
                <h3 className="text-[12px]   font-[500]">Yes</h3>
            </div>
          </div>
        ))}
          </main>
        </div>
      </Modal>
    </div>
  );
}

export default PrescriptionDetailsModal;
