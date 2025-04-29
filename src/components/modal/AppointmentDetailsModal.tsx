import Modal from "./modal";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { Link } from "react-router-dom";
type AppointmentDetailsModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};
function AppointmentDetailsModal({
  isModalOpen,
  setModalOpen,
  data,
}: AppointmentDetailsModalProps) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Appointment Details"
        hideCancel={false}
        style="!max-w-xl !mx-4 !md:mx-0 "
        buttonText="Reschedule"
      >
        <div>
          <div className="border border-gray-light rounded-sm p-2 flex flex-row  items-center gap-2">
            <div className="w-28 h-28 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div  className="space-y-1">
                <h4 className="text-base font-[500]">Cancer Check up</h4>
                <h4 className="text-xs ">Dr Herr Jones</h4>
                <button className="flex flex-row items-center py-1 px-3  bg-[#792CFF1A] text-[#792CFF] text-xs rounded-sm"><FaClock className="mr-1"/> {'12:00 - 13:00'}</button>
                <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center py-1 px-4  bg-[#00B2FF1A] text-[#00B2FF] text-xs rounded-full"><TbLocation className="mr-1"/> Hospital Location</button>
                <button className="flex flex-row items-center py-1 px-3   text-[#00B2FF] text-xs "> <Link to={''} className="border-b border-[#00B2FF]">View address </Link><TbLocation className="ml-1"/></button>
                </div>
              </div>
          </div>
          <main className="min-h-[200px]">
            <h4 className="text-sm text-inactive my-2">My note </h4>
            <p className="text-sm">
                i have a Stomach ache
            </p>
          </main>
        </div>
      </Modal>
    </div>
  );
}

export default AppointmentDetailsModal;
