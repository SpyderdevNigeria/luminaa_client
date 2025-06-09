import UserImage from "../../assets/images/patient/user.png";
import InfoLabel from "../../components/common/InfoLabel";
import { IoChatbubbleOutline } from "react-icons/io5";
import moment from "moment";
import { ILabOrder, IPatient, IDoctor, IAppointment } from "../../types/Interfaces";

interface LabOrderDetailsProps {
  data: {
    data: ILabOrder & {
      patient: IPatient;
      doctor: IDoctor;
      appointment: IAppointment;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
  setModalOpen: () => void;
  type?: "lab" | string;
  handleStatus?: () => void;
}

const LabOrderDetails = ({
  data,
  isLoading,
  error,
  setModalOpen,
  type,
  handleStatus,
}: LabOrderDetailsProps) => {
  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!data) return null;

  const {
    testName,
    notes,
    priority,
    status,
    collectedSample,
    statusHistory,
    patient,
    doctor,
    appointment,
    createdAt,
  } = data.data;

  const fullPatientName = `${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`;
  const fullDoctorName = `${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""}`;

  return (
    <div className="bg-white">
      <div className="w-full border border-dashboard-gray rounded-lg p-4 lg:p-8 col-span-4 space-y-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <section className="lg:col-span-4">
            <h2 className="text-xl font-semibold text-primary underline">Test Details</h2>
            <main className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-6 ">
              <InfoLabel label={testName} info="Test Name" />
              <InfoLabel
                label={status || 'pending'}
                info="Status"
                style="bg-blue-100 text-blue-700 py-1 px-2 rounded-sm"
              />
              <InfoLabel
                label={priority}
                info="Priority"
                style={`py-1 px-2 rounded-sm ${
                  priority === "high"
                    ? "bg-red-100 text-red-600"
                    : priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-700"
                }`}
              />
              <InfoLabel
                label={
                  appointment?.date
                    ? `${moment(appointment.date).format("MMM D, YYYY")} at ${moment(appointment.date).format("h:mm A")}`
                    : "N/A"
                }
                info="Appointment Date"
              />
              <InfoLabel
                label={moment(createdAt).format("MMM D, YYYY h:mm A")}
                info="Requested On"
              />
              <InfoLabel
                label={collectedSample ? "Yes" : "No"}
                info="Sample Collected"
              />
              <InfoLabel
                label={`${fullDoctorName} (${doctor?.specialty ?? "N/A"})`}
                info="Doctor"
              />

              <div className="space-y-2 col-span-2 lg:col-span-3">
                <p className="text-lg flex items-center gap-2">
                  <IoChatbubbleOutline /> Doctor&apos;s Note
                </p>
                <p className="text-base text-gray-700">{notes}</p>
              </div>

              <div className="col-span-2 lg:col-span-3">
                <h3 className="text-sm font-semibold text-gray-700">Status History</h3>
                <ul className="text-sm mt-2 space-y-1">
                  {statusHistory?.map((entry , index) => (
                    <li key={index}>
                      <span className="font-medium text-gray-800">{entry.status}</span> on{" "}
                      {moment(entry.updatedAt).format("MMM D, YYYY h:mm A")} by{" "}
                      <span className="text-gray-600">{entry.updatedBy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </section>

          <section className="lg:col-span-2">
            <div className="w-full space-y-4 pb-8 border border-dashboard-gray bg-gray-50 max-h-[470px] rounded-lg p-4 md:col-span-2">
              <h2 className="text-xl font-semibold ">Patient Information</h2>
              <div>
                <img
                  src={UserImage}
                  alt="avatar"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold text-xl capitalize ">
                  {fullPatientName}
                </p>
              </div>
              <hr className="border-t" />
              <InfoLabel label={patient?.email ?? "N/A"} info="Email" />
              <InfoLabel label={patient?.id ?? "N/A"} info="Patient ID" />
            </div>
          </section>
        </div>

        {type === "lab" && (
          <div className="flex flex-col gap-3 pt-4">
            <button
              className="w-full bg-primary hover:bg-primary/50 text-white text-sm px-4 py-3 rounded-md"
              onClick={() => {
                if (confirm("Do you want to change the status to 'IN_PROGRESS'?")) {
                  if (typeof handleStatus === "function") {
                    handleStatus();
                  } else {
                    alert("handleStatus function is not defined.");
                  }
                }
              }}
            >
              Start Test
            </button>
            <button
              className="w-full bg-gray-300 text-gray-600 text-sm px-4 py-3 rounded-md"
              onClick={() => setModalOpen()}
            >
              Input Test Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabOrderDetails;
