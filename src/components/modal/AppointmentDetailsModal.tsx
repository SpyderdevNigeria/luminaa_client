import Modal from "./modal";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import DoctorImage from "../../assets/images/doctor/doctor.png";
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
  if (!data) return null;
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/patient/consultations/${data.id}`);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setModalOpen(false)}
      title="Appointment Details"
      hideCancel={false}
      style="!md:max-w-xl !md:mx-4 !md:mx-0"
      buttonText="Reschedule"
      handleSubmit={handleSubmit}
    >
      <div>
        <div className="border border-gray-light rounded-sm p-2 flex flex-col md:flex-row items-center gap-2">
          <div className="w-20 h-20 md:w-28 md:h-28 overflow-hidden rounded-full">
            <img
              src={data.doctor?.profilePicture || DoctorImage}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-base ">
              Dr. {data.doctor?.firstName} {data.doctor?.lastName}
            </h4>
            <h4 className="text-xs ">{data.doctor?.specialization}</h4>
            <button className="flex flex-row items-center py-1 px-3 bg-[#792CFF1A] text-[#792CFF] text-xs rounded-sm">
              <FaClock className="mr-1" /> {`${data.time}`}
            </button>
            <div className="flex flex-row items-center gap-2">
              <button className="flex flex-row items-center py-1 px-4 bg-[#00B2FF1A] text-[#00B2FF] text-xs rounded-full">
                <TbLocation className="mr-1" />
                {data.location || "Hospital Location"}
              </button>
              <button className="flex flex-row items-center py-1 px-3 text-[#00B2FF] text-xs">
                <Link to={""} className="underline">
                  View address
                </Link>
                <TbLocation className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        <main className="min-h-[200px]">
          <h4 className="text-sm text-inactive my-2">My note</h4>
          <p className="text-sm">{data?.patientNote || "No note added."}</p>
        </main>
      </div>
    </Modal>
  );
}

export default AppointmentDetailsModal;
