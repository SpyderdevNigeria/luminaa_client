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
import moment from "moment";

interface DoctorAppointmentsViewProps {
  handleNext: () => void;
  appointment: any;
}

function DoctorAppointmentsView({ handleNext, appointment }: DoctorAppointmentsViewProps) {
  const { patient, scheduledDate, status, patientNote, location, id } = appointment;

  const patientName = `${patient?.user?.firstName || ""} ${patient?.user?.lastName || ""}`;
  const patientImage = patient?.user?.profilePicture?.url || "https://i.pravatar.cc/40";
  const scheduledMoment = moment(scheduledDate);

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
          <button className="text-blue-800 text-sm">Edit</button>
        </main>
      </main>

      {/* Join Meeting Info */}
      <main className="flex items-center justify-between p-2 border-y border-dashboard-gray">
        <h5 className="text-text-primary flex flex-row gap-2 text-sm">
          <SiGooglemeet className="text-2xl" />
          Meeting Details
        </h5>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-sm border border-dashboard-gray bg-white text-xs flex items-center">
            <TfiTimer className="mx-1 text-amber-400" />
            Send Reminder
          </button>
          <button className="px-8 py-2 rounded-sm bg-[#00BA8F] text-white text-xs">
            Join Meeting
          </button>
        </div>
      </main>

      {/* Meeting & General Info */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="w-full">
          <h4 className="text-sm md:text-2xl my-2">Meeting Info </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <InfoLabel label={`#${id?.slice(0, 8)}`} info={"Appointment ID"} />
            <InfoLabel
              label={scheduledMoment.format("MMMM DD, YYYY")}
              info={"Date"}
              style="bg-blue-100 text-blue-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel
              label={scheduledMoment.format("hh:mm A")}
              info={"Time"}
              style="bg-green-100 text-green-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel
              label={location}
              info={"Meeting Type"}
              style="bg-purple-100 text-purple-600 py-1 px-2 rounded-sm"
            />
            <InfoLabel
              label={location}
              info={"Meeting Link or address"}
            />
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
            <InfoLabel
              label={patient.address || "N/A"}
              info="Address"
            />
          </div>
        </div>
      </main>

      {/* Action Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="py-3 flex flex-row items-center justify-center text-[#4976F4] border-2 border-dashed border-[#4976F4] bg-blue-50 rounded-lg"
          onClick={handleNext}
        >
          <PiNotepadDuotone className="text-2xl mx-2" /> Add Medical Records
        </button>
        <Link
          to={routeLinks?.doctor?.patients + `/${patient?.id}`}
          className="py-3 flex flex-row items-center justify-center text-[#0091FF] border-2 border-[#0091FF1A] bg-[#0091FF1A] rounded-lg"
        >
          View Patient Details <IoExitOutline className="text-2xl mx-2" />
        </Link>
        <button className="py-3 flex flex-row items-center justify-center text-gray-700 border-2 border-dashboard-gray bg-dashboard-gray rounded-lg col-span-2">
          Finish Consultation
        </button>
        <h1 className="py-3 flex flex-row items-center justify-center col-span-2 text-gray-700">
          <GrCircleInformation className="text-2xl mx-2" /> Please add Medical
          records to finish this treatment
        </h1>
      </section>
    </section>
  );
}

export default DoctorAppointmentsView;
