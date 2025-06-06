import Modal from "./modal";
import moment from "moment";
import StatusBadge from "../common/StatusBadge";
import { useNavigate } from "react-router-dom";
import DoctorImage from '../../assets/images/doctor/doctor.png'
import routeLinks from "../../utils/routes";
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
  const prescription = data;
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (prescription?.appointment?.id) {
      navigate(`${routeLinks?.patient?.consultations}/${prescription.appointment.id}`);
    }
  };
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={`Prescription`}
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0"
        buttonText="View Appointment"
        handleSubmit={handleSubmit}
      >
        <div>
          <div className="rounded-sm p-2 flex flex-col md:flex-row items-center gap-2">
            <div className="w-20 h-20 md:w-28 md:h-28 overflow-hidden rounded-full">
              <img
                src={DoctorImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-base">Prescribed By</h4>
              <h4 className="text-base">
                Dr {prescription?.doctor?.firstName} {prescription?.doctor?.lastName}
              </h4>
              <h4 className="text-sm">#{prescription?.doctor?.
                  specialty
                  }</h4>
              {/* <button className="flex flex-row items-center py-1 px-3 bg-[#792CFF1A] text-[#792CFF] text-[10px] rounded-sm">
                <FaClock className="mr-1" />
                {moment(prescription?.appointment?.scheduledDate).format("HH:mm")}
              </button>
              <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center py-1 px-4 bg-[#00B2FF1A] text-[#00B2FF] text-[10px] rounded-full">
                  <TbLocation className="mr-1" /> Hospital Location
                </button>
              </div> */}
            </div>
          </div>

          <main className="min-h-[200px] flex flex-col gap-4 py-4">
            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Prescription Name</h4>
              <h3 className="text-sm text-text-primary">
                {prescription?.medicationName}
              </h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Dosage</h4>
              <h3 className="text-sm text-text-primary">{prescription?.dosage}</h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Date Issued</h4>
              <h3 className="text-sm text-text-primary">
                {moment(prescription?.createdAt).format("MMMM D, YYYY")}
              </h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Frequency</h4>
              <h3 className="text-sm text-text-primary">{prescription?.frequency}</h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Refillable</h4>
              <h3 className="text-sm text-text-primary">
                {prescription?.isRefillable ? "YES" : "NO"}
              </h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Status</h4>
              <StatusBadge status={prescription?.status} />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">
                Additional Recommendations
              </h4>
              <h3 className="text-sm text-text-primary">
                {prescription?.additionalRecommendations || "None"}
              </h3>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm text-text-secondary font-[300]">Instructions</h4>
              <h3 className="text-sm text-text-primary capitalize">
                {prescription?.instructions}
              </h3>
            </div>
          </main>
        </div>
      </Modal>
    </div>
  );
}

export default PrescriptionDetailsModal;
