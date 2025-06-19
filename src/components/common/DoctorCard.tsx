import { useState } from "react";
import DoctorIcon from "../../assets/images/doctor/doctor.png";
import {   FaCalendarAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import Modal from "../modal/modal";
import { useToaster } from "./ToasterContext";

interface Doctor {
  id: string;
  user: {
    id: string;
    profilePicture: { url: string } | null;
    firstName: string;
    lastName: string;
  };
  isActive: boolean;
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

const DoctorCard = ({ doctor, handleClick }: DoctorCardProps) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const { showToast } = useToaster();
  const fullName = `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`;
  const imageUrl = doctor.user.profilePicture?.url || DoctorIcon;

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md relative hover:shadow-lg transition cursor-pointer">

        {/* Image */}
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden  shadow-md">
          <img
            src={imageUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Specialty */}
        <div className="text-center mt-3">
          <h3 className="text-base font-semibold">{fullName}</h3>

          <div className="mt-2">
            <p className="text-xs text-gray-500">specialty</p>
            <span className="inline-block text-primary text-base font-medium px-3 py-1 rounded-full">
              {doctor.specialty}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-1 border-gray-50  pt-3">
         <div className="relative group inline-block">
  <button
    onClick={() => setShowAvailability(true)}
    className="text-primary border border-primary p-2 rounded-md"
  >
    <FaCalendarAlt className="text-sm" />
  </button>

  {/* Tooltip */}
  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
    View Availability
  </div>
</div>

          <button
            onClick={() => {
              doctor?.availability?.data && doctor.availability.data.length > 0 ?
              handleClick?.()
              : showToast("Sorry this doctor is currently unavailable", "error");
            }}
            className="flex-1 w-full text-xs flex items-center justify-center gap-1 bg-primary text-white rounded-md py-2"
          >
            <FaBookmark className="text-sm" /> Book An Appointment
          </button>
        </div>
      </div>

      {/* Availability Modal */}
      {showAvailability && (
        <Modal
          open={showAvailability}
          onClose={() => setShowAvailability(false)}
          title={`${fullName}'s Availability`}
        >
          <div className="space-y-3 my-8">
            {doctor?.availability?.data?.length ? (
              doctor.availability.data.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-sm"
                >
                  <span className="capitalize font-medium">
                    {slot.dayOfWeek}
                  </span>
                  <span>
                    {slot.allDay
                      ? "All Day"
                      : `${slot.startTime} - ${slot.endTime}`}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">
               No availability info provided.
              </p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default DoctorCard;
