import { PiTestTubeBold } from "react-icons/pi";
import routeLinks from "../../utils/routes";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function LabCard({ order, type = "lab" }: { order: any; type: string }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (type) {
      case "lab":
        return navigate(`${routeLinks?.lab?.labRequests}/${order?.id}`);
      case "doctor":
        return navigate(`${routeLinks?.doctor?.labOrdersDetails}/${order?.id}`);
      case "patient":
        return navigate(`${routeLinks?.patient?.orderDetails}/${order?.id}`);
      default:
        break;
    }
  };

  const patientName = `${order?.patient?.firstName ?? ""} ${order?.patient?.lastName ?? ""}`;
  const testName = order?.testName || "Lab Test";
  const testNotes = order?.notes || "No additional notes provided.";
  const priority = order?.priority || "normal";
  const status = order?.status || "PENDING";

  const doctorName = `${order?.doctor?.firstName ?? ""} ${order?.doctor?.lastName ?? ""}`;
  const doctorSpecialty = order?.doctor?.specialty || "N/A";

  const appointmentDate = order?.appointment?.date
    ? moment(order.appointment.date).format("MMM D, YYYY")
    : "N/A";
  const appointmentTime = order?.appointment?.date
    ? moment(order.appointment.date).format("h:mm A")
    : "N/A";

  const createdAt = moment(order?.createdAt).format("MMM D, YYYY h:mm A");

  return (
    <main className="border border-primary p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-4 bg-primary text-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full">
          <PiTestTubeBold className="text-white text-2xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{testName}</h3>
          <p className="text-sm text-white/80">Requested on {createdAt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-white/80">Patient</h4>
          <p className="text-base">{patientName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white/80">Doctor</h4>
          <p className="text-base">
            {doctorName} <span className="text-sm text-white/60">({doctorSpecialty})</span>
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white/80">Appointment</h4>
          <p className="text-base">
            {appointmentDate} at {appointmentTime}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-white/80">Priority</h4>
          <span
            className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-semibold capitalize ${
              priority === "high"
                ? "bg-red-600/20 text-red-200"
                : priority === "medium"
                ? "bg-yellow-600/20 text-yellow-200"
                : "bg-green-600/20 text-green-200"
            }`}
          >
            {priority} priority
          </span>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-sm font-medium text-white/80">Notes</h4>
          <p className="text-sm text-white/90">{testNotes}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={status} />
        <button
          onClick={handleNavigate}
          className="bg-white text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-white/90"
        >
          View Test Request
        </button>
      </div>
    </main>
  );
}

export default LabCard;
