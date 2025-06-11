import DoctorIcon from '../../assets/images/doctor/doctor.png';
interface Doctor {
  id: string;
  user: {
    id: string;
    profilePicture: { url: string } | null;
    firstName: string;
    lastName: string;
  };
  specialty: string;
  availability: {
    data:
      | {
          allDay: boolean;
          endTime: string;
          dayOfWeek: string;
          startTime: string;
        }[]
      | null;
  } | null;
}

interface DoctorCardProps {
  handleClick?: () => void;
  doctor: Doctor;
}

const DoctorCard = ({ doctor, handleClick } : DoctorCardProps) => (
  <div
   
    className="bg-white p-4 rounded-lg  hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer "
  >
    {/* Avatar & Header */}
    <div className="">
        <div className="w-full h-48 overflow-hidden bg-gray-50 rounded-lg">
         <img
        className="w-full h-full object-contain "
        src={DoctorIcon}
        alt="Doctor"
      />
        </div>
      <h3 className="mt-4 text-base font-semibold ">
        Dr {doctor.user.firstName} {doctor.user.lastName}
      </h3>
      <p className="text-sm text-gray-600">{doctor.specialty}</p>
    </div>

    {/* Availability Secion */}
    <div className="">
      {/* <h4 className="text-sm font-medium text-gray-700 mb-2 ">
        Availability
      </h4> */}
      <div className="flex flex-wrap my-4 gap-2">
        {doctor?.availability?.data?.map((slot, idx) => (
          <div
            key={idx}
            className="flex items-center text-sm text-gray-800 gap-1 bg-gray-50 px-2 py-1 rounded-full"
          >
            {slot.dayOfWeek}
          </div>
        ))}
      </div>

      <button className="p-3 bg-primary text-white w-full rounded-lg mt-4" onClick={() => handleClick?.()}>
        Book
      </button>
    </div>
  </div>
);


export default DoctorCard;