import { LuTvMinimal } from "react-icons/lu";
import { BiEdit } from "react-icons/bi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import StatusBadge from "../../../../components/common/StatusBadge";
import { TfiTimer } from "react-icons/tfi";
import { PiNotepadDuotone } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import routeLinks from "../../../../utils/routes";
import InfoLabel from "../../../../components/common/InfoLabel";
import UserProfile from "../../../../assets/images/patient/user.png";
import moment from "moment";
import { getFormattedDateTime } from "../../../../utils/dashboardUtils";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import DoctorApi from "../../../../api/doctorApi";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useToaster } from "../../../../components/common/ToasterContext";

interface DoctorAppointmentsViewProps {
  handleNext: (e: string) => void;
  appointment: any;
  fetchAppointment: () => void;
}

function DoctorAppointmentsView({
  handleNext,
  appointment,
  fetchAppointment,
}: DoctorAppointmentsViewProps) {
  const { patient, scheduledDate, status, patientNote, location, id } =
    appointment;

  const patientName = `${patient?.user?.firstName || ""} ${
    patient?.user?.lastName || ""
  }`;

  const patientImage = patient?.user?.profilePicture?.url || UserProfile;
  const { formattedDate, formattedTime } = getFormattedDateTime(scheduledDate);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confrimLoading, setStartLoading] = useState(false);
  const { showToast } = useToaster();

  // State for procedures modal
  const onConfirm = async () => {
    try {
      setStartLoading(true);
      // Example API call or navigation
      await DoctorApi.finishConsultation(appointment?.id);
      console.log("Finishing consultation...");
      setConfirmOpen(false);
      setStartLoading(false);
      showToast("Finished consultation", "success");
      fetchAppointment(); // Refresh appointment data
      // Optional: redirect or update view
    } catch (error:any) {
      console.error("Failed to finish consultation", error);
      showToast(error?.response?.data?.message || "Failed to finish consultation", "error");
      setStartLoading(false);
    }
  };

  const confirmMessage = "Are you sure you want to finish this consultation?";



  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between text-text-secondary text-inactive">
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <h5>Appointment ID </h5>
          <button className="border boder-dashboard-gray bg-gray-100 rounded-sm px-1">
            #{id?.slice(0, 8)}
          </button>
          <span className="w-2 h-2 rounded-full bg-gray-200"></span>
          <LuTvMinimal />
          <h5>Automatic Appointment </h5>
        </div>
        <BiEdit className="text-2xl" />
      </div>

      {/* Patient Info */}
      <main className="border border-dashboard-gray rounded-lg">
        <div className="flex flex-row items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-15 h-15 overflow-hidden rounded-full">
              <img
                src={patientImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs">Patient Name</h4>
              <h4 className="text-base font-semibold">{patientName}</h4>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Patient Note */}
        <main className="flex items-center justify-between p-6 bg-[#DFE7FF4D] border-y border-dashboard-gray">
          <h5 className="text-text-primary flex flex-row gap-2 text-sm">
            <MdOutlineStickyNote2 className="text-2xl" />
            {patientNote || "No patient note provided..."}
          </h5>
          <Link
            to={routeLinks?.doctor?.patients + `/${patient?.id}`}
            className="text-blue-800 text-sm underline"
          >
            View Patient Details
          </Link>
        </main>
      </main>

      {/* Join Meeting Info */}
      <main className="flex items-center justify-between p-2 border-y border-dashboard-gray">
        <h5 className="text-text-primary flex flex-row gap-2 text-sm">
          <SiGooglemeet className="text-2xl" />
          Meeting Details
        </h5>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-sm border border-dashboard-gray bg-white  text-xs flex items-center">
            <TfiTimer className="mx-1 text-amber-400" />
            Send Reminder
          </button>
          <a
            href={appointment?.onlineMeetingDetails?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2 rounded-sm bg-[#00BA8F] text-white text-xs"
          >
            Join Meeting
          </a>
        </div>
      </main>

      {/* Meeting & General Info */}
      <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="w-full">
          <h4 className="text-sm md:text-2xl my-2">Meeting Info </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <InfoLabel label={`#${id?.slice(0, 8)}`} info={"Appointment ID"} />
            <InfoLabel
              label={formattedDate}
              info={"Date"}
              style="bg-blue-100 text-blue-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel
              label={formattedTime}
              info={"Time"}
              style="bg-green-100 text-green-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel
              label={location}
              info={"Meeting Type"}
              style="bg-purple-100 text-purple-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel label={location} info={"Meeting Link or address"} />
            <InfoLabel label={"None"} info={"Time"} />
          </div>
        </div>

        <div className="">
          <h4 className="text-sm md:text-2xl my-2">General Info </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <InfoLabel label={patientName} info="Name" />
            <InfoLabel label={patient.phoneNumber || "N/A"} info="Phone" />
            <InfoLabel label={patient.user?.email || "N/A"} info="Email" />
            <InfoLabel
              label={moment().diff(patient.dateOfBirth, "years").toString()}
              info="Age"
            />
            <InfoLabel label={patient.gender || "N/A"} info="Gender" />
            <InfoLabel label={patient.address || "N/A"} info="Address" />
          </div>
        </div>
      </main>

      <div>
        {appointment?.patientDocuments?.length > 0 ?
        
        <div>
              <h4 className="text-sm md:text-2xl my-2">Patient Documents </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointment?.patientDocuments?.map((doc: { id: Key | null | undefined; url: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={doc.id} className="p-4 bg-white  rounded shadow border border-gray-200">
                  <div className="mb-2 w-40 h-40 overflow-hidden mx-auto">
                    <img src={doc.url} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className=" mb-2">
                    <h4 className="text-sm font-medium">Document Name</h4>
                    <h4 className="text-xs text-gray-500">{doc.name}</h4>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Document Type</h4>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-2">
                    <a href={doc.url} target="_blank" rel="noreferrer" className="text-blue-600 text-xs">View Document</a>
                  </div>
                </div>
              ))}
            </div>
        </div>
        : 
        
        <div className="flex flex-col items-center justify-center h-40"> 
          No additional document from patient
        </div>
        }

      </div>
{/* Action Buttons Section */}
<section className="mt-6 bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <GrCircleInformation className="text-blue-500 text-xl" />
    Consultation Actions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Diagnosis */}
    <button
      onClick={() => handleNext("DiagnosisDetails")}
      className="flex items-center justify-center w-full md:w-auto gap-2 py-3 rounded-lg text-[#4976F4] border-2 border-dashed border-[#4976F4] bg-blue-50 hover:bg-blue-100 transition"
    >
      <PiNotepadDuotone className="text-xl" />
      <span className="font-medium">Diagnosis</span>
    </button>

    {/* Prescriptions */}
    <button
      onClick={() => handleNext("PrescriptionDetails")}
      className="flex items-center justify-center gap-2 py-3  w-full md:w-auto rounded-lg border border-cyan-200 text-cyan-600 bg-cyan-50 hover:bg-cyan-100 transition"
    >
      <IoExitOutline className="text-xl" />
      <span className="font-medium">Prescriptions</span>
    </button>

    {/* Order Tests */}
    <button
      onClick={() => handleNext("OrderDetails")}
      className="w-full md:w-auto flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
    >
      <span className="font-medium">Order Tests</span>
    </button>

    {/* Medical History */}
      <button
      onClick={() => handleNext('MedicalHistory')}
      className="w-full md:w-auto flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:opacity-90 transition"
    >
      <span className="font-medium">Medical History</span>
    </button>


    {/* Add Procedure */}
    <button
      onClick={() => handleNext('ProcedureDetails')}
      className="md:col-span-2 flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:opacity-90 transition"
    >
      <span className="font-medium">Procedures</span>
    </button>


    {/* Finish Consultation */}
    <button
      onClick={() => setConfirmOpen(true)}
      className="md:col-span-2 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
    >
      <span className="font-medium">Finish Consultation</span>
    </button>
  </div>

  {/* Info Note */}
  <p className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
    <GrCircleInformation className="text-base text-gray-400" />
    Please add medical records before finishing this treatment.
  </p>
</section>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirm}
        onClose={() => {
          setConfirmOpen(false);
          setStartLoading(false);
        }}
        loading={confrimLoading}
      />


    </section>
  );
}

export default DoctorAppointmentsView;
