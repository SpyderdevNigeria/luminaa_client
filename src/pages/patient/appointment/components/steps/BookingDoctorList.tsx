import { useEffect, useState, useMemo, useCallback } from "react";
import CustomCalendar from "../../../../../components/common/CustomCalendar";
import PatientApi from "../../../../../api/patientApi";
import DoctorIcon from "../../../../../assets/images/doctor/doctor.png";

interface Doctor {
  id: number;
  user: {
    id: number;
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
  specialty: string;
}

interface BookingDoctorListProps {
  nextStep: () => void;   
  setData: (data: any) => void;
  data: any;
  prevStep: () => void;
}

const BookingDoctorList: React.FC<BookingDoctorListProps> = ({ nextStep, setData, data, prevStep }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [typeTime, setTypeTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const AppointmentTime = useMemo(
    () => [
      { id: 1, name: "9:00 AM" },
      { id: 2, name: "10:00 AM" },
      { id: 3, name: "11:00 AM" },
      { id: 4, name: "12:00 PM" },
      { id: 5, name: "1:00 PM" },
      { id: 6, name: "2:00 PM" },
    ],
    []
  );

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
  };

  const canProceed = selectedDoctor && typeTime && selectedDate;

  const handleNextStep = () => {
    if (!canProceed || !selectedDoctor) return;

    const selectedTimeObj = AppointmentTime.find(
      (t) => t.name.toString() === typeTime
    );
    if (!selectedTimeObj) return;

    const [time, period] = selectedTimeObj.name.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);

    const isoString = date.toISOString();

    setData({
      ...data,
      doctorId: selectedDoctor?.user?.id,
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
                        src={doctor?.user?.profilePicture || DoctorIcon}
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
        <main>
          <section className="flex justify-between items-center my-8">
            <div className="flex flex-row items-center gap-2">
              <div className="overflow-hidden rounded-full w-18 h-18">
                <img
                  src={selectedDoctor.user.profilePicture || DoctorIcon}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold md:text-lg">
                  Dr {selectedDoctor?.user?.firstName}{" "}
                  {selectedDoctor?.user?.lastName}
                </h5>
                <h6 className="text-xs md:text-sm text-[#ABABAB]">
                  {selectedDoctor?.specialty}
                </h6>
                <h6 className="text-xs text-[#ABABAB]">PH.D</h6>
              </div>
            </div>
            <button
              className="text-sm text-red-500 underline"
              onClick={handleCancelDoctor}
            >
              Cancel
            </button>
          </section>

          <section>
            <h3 className="text-sm md:text-base mb-4">
              Select a Date For your appointment
            </h3>
            <div className="mt-4">
              <CustomCalendar
                handleSelectedDate={(date:any) => setSelectedDate(date)}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm md:text-base my-4">Select Time</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {AppointmentTime.map((e) => (
                <button
                  key={e.name}
                  className={`rounded-sm border text-sm p-2 ${
                    typeTime === e.name.toString()
                      ? "border-primary bg-primary text-white"
                      : ""
                  }`}
                  onClick={() => setTypeTime(e.name.toString())}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-2 mt-6">
            {canProceed && (
              <button
                onClick={handleNextStep}
                disabled={!canProceed}
                className={`cursor-pointer form-primary-button ${
                  canProceed ? "bg-primary" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </main>
      )}
      <button
        onClick={prevStep}
        className="!w-full text-primary cursor-pointer mt-4"
      >
        Back
      </button>
    </div>
  );
}

export default BookingDoctorList;