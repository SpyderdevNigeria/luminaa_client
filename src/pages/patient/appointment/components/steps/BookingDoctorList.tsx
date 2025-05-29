import { useEffect, useState, useCallback } from "react";
import CustomCalendar from "../../../../../components/common/CustomCalendar";
import PatientApi from "../../../../../api/PatientApi";
import DoctorIcon from "../../../../../assets/images/doctor/doctor.png";

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
    allDay: boolean;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[] | null;
}

interface BookingDoctorListProps {
  nextStep: () => void;
  setData: (data: any) => void;
  data: any;
  prevStep: () => void;
}

const BookingDoctorList: React.FC<BookingDoctorListProps> = ({
  nextStep,
  setData,
  data,
  prevStep,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [typeTime, setTypeTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await PatientApi.getDoctors();
        if (response?.status) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorSelect = useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor);
  }, []);

  const handleCancelDoctor = () => {
    setSelectedDoctor(null);
    setTypeTime("");
    setSelectedDate("");
    setAvailableTimes([]);
  };

  const canProceed = selectedDoctor && typeTime && selectedDate;

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    setTypeTime("");

    if (!selectedDoctor?.availability) {
      setAvailableTimes([]);
      return;
    }

    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const slot = selectedDoctor.availability.find((slot) => slot.dayOfWeek === dayName);
    if (!slot) {
      setAvailableTimes([]);
      return;
    }

    const start = parseInt(slot.startTime.split(":")[0], 10);
    const end = parseInt(slot.endTime.split(":")[0], 10);
    const times = [];

    for (let hour = start; hour <= end; hour++) {
      const suffix = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      times.push(`${displayHour}:00 ${suffix}`);
    }

    setAvailableTimes(times);
  };

  const handleNextStep = () => {
    if (!canProceed || !selectedDoctor) return;

    const [time, period] = typeTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);

    const isoString = date.toISOString();

    setData({
      ...data,
      doctorId: selectedDoctor?.id,
      scheduledDate: isoString,
    });

    nextStep();
  };

  return (
    <div>
      {!selectedDoctor ? (
        <section className="mt-4">
          <h5 className="mb-1 text-lg">Available Doctors</h5>
          {loading ? (
            <div className="mt-4 text-center text-sm">Loading doctors...</div>
          ) : (
            <div className="mt-2 max-h-[900px] overflow-y-scroll">
              {doctors.map((doctor) => (
                <div
                  key={doctor?.id}
                  className="flex flex-row items-center justify-between border hover:border-primary p-4 mt-2 rounded-lg cursor-pointer"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="overflow-hidden rounded-full w-18 h-18">
                      <img
                        src={
                          doctor?.user?.profilePicture
                            ? doctor.user.profilePicture?.url
                            : DoctorIcon
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold md:text-lg">
                        Dr {doctor?.user?.firstName} {doctor?.user?.lastName}
                      </h5>
                      <h6 className="text-xs md:text-sm text-[#ABABAB]">
                        {doctor?.specialty}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <main className="mt-4">
          <section className="flex flex-row items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                  <div className="overflow-hidden rounded-full w-18 h-18">
                      <img
                        src={
                          selectedDoctor?.user?.profilePicture
                            ? selectedDoctor.user.profilePicture?.url
                            : DoctorIcon
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
            <div>
                <h5 className="text-lg font-medium">
              Dr {selectedDoctor.user.firstName} {selectedDoctor.user.lastName}
            </h5>
            <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
            </div>
          </div>
                      <button
            className="text-sm text-red-500 underline mb-4"
            onClick={handleCancelDoctor}
          >
            ← Change Doctor
          </button>
          </section>

          <div className="mb-6">
            <h6 className="font-semibold mb-2">Doctor's Weekly Availability</h6>
            {selectedDoctor.availability?.length ? (
              <ul className="text-sm text-gray-700">
                {selectedDoctor.availability.map((slot, index) => (
                  <li key={index} className="mb-1">
                    {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No availability info provided.</p>
            )}
          </div>

          <div className="mb-6">
            <h6 className="font-semibold mb-2">Select Date</h6>
            <CustomCalendar
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
            />
          </div>

          <div className="mb-6">
            <h6 className="font-semibold mb-2">Select Time</h6>
            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setTypeTime(time)}
                    className={`p-2 rounded-lg border ${
                      typeTime === time
                        ? "bg-primary text-white"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No available times for selected date.</p>
            )}
          </div>

          <div className="mt-6">
             <button
              onClick={handleNextStep}
              disabled={!canProceed}
              className={`${
                canProceed
                  ? "form-primary-button bg-primary my-4 "
                  : "form-primary-button bg-primary my-4  bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
            <button
              onClick={prevStep}
         className="text-primary cursor-pointer w-full"
            >
              Back
            </button>
           
          </div>
        </main>
      )}
    </div>
  );
};

export default BookingDoctorList;
