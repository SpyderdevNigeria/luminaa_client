import { useState } from "react";
import DoctorIcon from "../../assets/images/doctor/doctor.png";
import { FaCalendarAlt } from "react-icons/fa";
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
        }[] | null;
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
      <div className="bg-white  border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-4 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-3">
          <img
            src={imageUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Specialty */}
        <h3 className="text-center text-base font-semibold text-gray-800">
          {fullName}
        </h3>
        <span className="mt-1 text-sm text-gray-500">{doctor.specialty}</span>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 w-full">
          {/* Availability Button */}
          <div className="relative group">
            <button
              onClick={() => setShowAvailability(true)}
              className="p-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              <FaCalendarAlt className="text-sm" />
            </button>
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              View Availability
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={() => {
              doctor?.availability?.data?.length
                ? handleClick?.()
                : showToast(
                    "Sorry, this doctor is currently unavailable",
                    "error"
                  );
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-md py-2 text-sm hover:bg-primary/90 transition"
          >
            <FaBookmark className="text-sm" /> Book Appointment
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
          <div className="space-y-3 my-6">
            {doctor?.availability?.data?.length ? (
              doctor.availability.data.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded text-sm"
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
