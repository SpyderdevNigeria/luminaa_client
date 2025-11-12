// import { RiLink } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import PatientApi from "../../../../api/PatientApi";
import useAppointments from "../../../../hooks/useAppointments";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "../../../../hooks/usePaystackPayment";
import { EntityType } from "../../../../types/Interfaces";

function BookingDetails() {
  const { appointments, page, getAppointments } = useAppointments(PatientApi);
  const { initializePayment, loading, message } = usePaystackPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    getAppointments();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const appointment = appointments[0];

  if (!appointment)
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        Loading Appointment Details ...
      </div>
    );

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await initializePayment(EntityType.APPOINTMENT, appointment.id);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="max-w-[500px] mx-auto border border-gray-light rounded-lg p-4 md:p-6 animate-fade-in my-12">
      <h5 className="text-xl md:text-2xl font-medium">Booking Details</h5>

      {/* Consultation Type */}
      <div className="my-4 border-t py-6 pb-4 border-gray-light">
        <h4 className="text-[#666666] text-base ">Consultation type</h4>
        <div className="flex flex-row items-center mt-2 justify-between">
          <h5 className="text-[#2A2A2A] text-base ">
            {appointment.patientNote || "General Consultation"}
          </h5>
          {/* <h6 className="text-[#2A2A2A] text-base flex flex-row gap-4">
            <span className="text-primary-green">1x</span> ₦100,004
          </h6> */}
        </div>
      </div>

      {/* Consultation Center */}
      {/* <div className="my-4 border-t py-6 pb-4 border-gray-light">
        <h4 className="text-[#666666] text-base ">Consultation center</h4>
        <div className="mt-3">
          <h5 className="text-[#2A2A2A] text-base ">
            {appointment.location === "Online"
              ? "Zoom Meeting"
              : appointment.location}
          </h5>
          {appointment.location === "Online" && (
            <a
              href={appointment?.onlineMeetingDetails?.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-[300] flex flex-row items-center gap-2"
            >
              <RiLink /> Join Meeting
            </a>
          )}
        </div>
      </div> */}

      {/* Date & Time */}
      <div className="my-4 border-t py-6 pb-4 border-gray-light">
        <h4 className="text-[#666666] text-base ">Date & Time</h4>
        <h6 className="text-[#2A2A2A] text-base flex flex-row items-center gap-1 mt-2">
          <CiCalendar className="text-lg text-secondary" />
          {new Date(appointment.scheduledDate).toLocaleString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </h6>
        <div className="flex flex-row items-center mt-4 justify-between">
          <h5 className="text-[#666666] text-base ">
            With Dr. {appointment?.doctor?.firstName}{" "}
            {appointment?.doctor?.lastName}
          </h5>
        </div>
        {appointment.location === "Online" && (
          <h5 className="text-[#2A2A2A] text-base mt-2">Zoom meeting</h5>
        )}
      </div>

      {/* Total */}
      <div className="mt-4 border-t pt-6 pb-0 border-gray-light">
        {/* <div className="flex flex-row items-center mt-8 mb-4 justify-between">
          <h5 className="text-xl">Total Amount</h5>
          <h6 className="text-xl">₦100,004</h6>
        </div> */}

        <button
          className="cursor-pointer form-primary-button bg-primary mt-4 text-white rounded-lg px-6 py-3 hover:bg-primary/90 transition disabled:opacity-50"
          disabled={loading || isProcessing}
          onClick={handlePayment}
        >
          {loading || isProcessing ? "Processing..." : "Proceed to Pay"}
        </button>

        {message && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-center mt-4 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}

export default BookingDetails;
