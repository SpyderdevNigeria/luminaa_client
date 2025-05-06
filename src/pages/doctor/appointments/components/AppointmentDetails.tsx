import { LuTvMinimal } from "react-icons/lu";
import { BiEdit } from "react-icons/bi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import StatusBadge from "../../../../components/common/StatusBadge";
import { TfiTimer } from "react-icons/tfi";
import { PiNotepadDuotone } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
function DoctorAppointmentsView({ handleNext }: { handleNext: () => void }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between text-text-secondary">
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <h5 className="">Appointment ID </h5>
          <button className="border boder-dashboard-gray bg-gray-100 rounded-sm px-1">
            #12347458
          </button>
          <span className="w-2 h-2 rounded-full bg-gray-200"></span>
          <LuTvMinimal />
          <h5>Automatic Appointment </h5>
        </div>
        <BiEdit className="text-2xl" />
      </div>
    {/* Patient Info */}
      <main className="border border-dashboard-gray rounded-lg ">
        <div className="flex flex-row items-center p-4 justify-between ">
          <div className="flex items-center gap-2 ">
            <div className="w-20 h-20 md:w-15 md:h-15 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs ">Patient Name</h4>
              <h4 className="text-base font-semibold">Ajayi Raymond</h4>
            </div>
          </div>
          <StatusBadge status={"pending"} />
        </div>
        <main className="flex items-center justify-between p-6 bg-[#DFE7FF4D] border-y border-dashboard-gray">
          <h5 className="text-text-primary  flex flex-row gap-2 text-sm">
            {" "}
            <MdOutlineStickyNote2 className="text-2xl" /> This is the doc a
            note, tap on this for it to open up........
          </h5>
          <button className="text-blue-800 text-sm ">Edit</button>
        </main>
      </main>
      {/* Join Meeting Info */}
      <main className="flex items-center justify-between p-2 border-y border-dashboard-gray">
        <h5 className="text-text-primary  flex flex-row gap-2 text-sm">
          {" "}
          <SiGooglemeet className="text-2xl" /> Meeting Details
        </h5>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-sm border border-dashboard-gray bg-white text-xs flex items-center ">
            <TfiTimer className="mx-1 text-amber-400" />
            Send Reminder
          </button>
          <button className="px-8 py-2 rounded-sm bg-[#00BA8F] text-white text-xs ">
            Join Meeting
          </button>
        </div>
      </main>
      {/* Meeting info and General Info */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
        <div className="w-full">
          <h4 className="text-sm md:text-2xl  my-2">Meeting Info </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 ">
            <MeetingInformation label={"Appointment ID"} info={"#2738378"} />
            <MeetingInformation label={"March 20, 2025"} info={"Date"} style={'bg-blue-100 text-blue-600 py-1 px-2  rounded-sm'} />
            <MeetingInformation label={"12:58AM"} info={"Time"} style={'bg-green-100 text-green-600 py-1 px-2 rounded-sm'} />
            <MeetingInformation label={"Hospital Visit"} info={"Meeting Type"} style={'bg-purple-100 text-purple-600 py-1 px-2 rounded-sm'} />
            <MeetingInformation label={"Location"} info={"Meeting Link or address"} />
            <MeetingInformation label={"Time"} info={"None"} />
          </div>
        </div>
        <div className="">
          <h4 className="text-sm md:text-2xl  my-2">General Info </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 ">
            <MeetingInformation label={"Ajayi raymond"} info={"Name"} />
            <MeetingInformation label={"09176456787"} info={"Phone"}  />
            <MeetingInformation label={"qjayiraymond@lumina"} info={"Email"}  />
            <MeetingInformation label={"43"} info={"Age"}  />
            <MeetingInformation label={"Male"} info={"Gender"}  />
            <MeetingInformation label={"12 Lumina medicals"} info={"Address"}  />
          </div>
        </div>
      </main>

    {/* Action Button Section */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button className="py-3 flex flex-row items-center justify-center text-[#4976F4] border-2 border-dashed border-[#4976F4] bg-blue-50 rounded-lg"
      onClick={handleNext}
      ><PiNotepadDuotone className="text-2xl mx-2" /> Add Medical Records</button>
      <button className="py-3 flex flex-row items-center justify-center text-[#0091FF] border-2  border-[#0091FF1A] bg-[#0091FF1A] rounded-lg"> Add Medical Records <IoExitOutline className="text-2xl mx-2" /> </button>
      <button className="py-3 flex flex-row items-center justify-center text-gray-700 border-2  border-dashboard-gray bg-dashboard-gray rounded-lg col-span-2">Finish Consultation</button>
      <h1 className="py-3 flex flex-row items-center justify-center col-span-2 text-gray-700"><GrCircleInformation  className="text-2xl mx-2" /> Please add Medical records to finish this treatment</h1>
    </section>

    </section>
  );
}

interface MeetingInformationProps {
  label: string;
  info: string;
  style?: string;
}

const MeetingInformation = ({
  label,
  info,
  style,
}: MeetingInformationProps) => {
  return (
    <div className="" >
      <span className={`text-sm 2xl:text-base ${style}`}>{label}</span>
      <h3 className="text-xs 2xl:text-sm text-gray-500 mt-3">{info}</h3>
    </div>
  );
};


export default DoctorAppointmentsView;
