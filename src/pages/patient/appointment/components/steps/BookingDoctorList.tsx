import { useEffect, useState, useCallback } from "react";
import CustomCalendar from "../../../../../components/common/CustomCalendar";
import PatientApi from "../../../../../api/PatientApi";
import DoctorCard from "../../../../../components/common/DoctorCard";
import DoctorIcon from "../../../../../assets/images/doctor/doctor.png";
import PaginationComponent from "../../../../../components/common/PaginationComponent";
import { adminDoctorSpecialties } from "../../../../../utils/dashboardUtils";
import { FiSearch } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { useToaster } from "../../../../../components/common/ToasterContext";
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
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [showSpecialtyList, setShowSpecialtyList] = useState(false);
  const { showToast } = useToaster();
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", String(page));
        queryParams.append("limit", String(limit));
        if (search) queryParams.append("search", search);
        if (specialty) queryParams.append("specialty", specialty);

        const queryStr = `?${queryParams.toString()}`;

        const response = await PatientApi.getDoctors(queryStr);
        if (response?.status) {
          setDoctors(response.data.data);
          setTotal(response.data.total);
          setTotalPages(Math.ceil(response.data.total / limit));
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, limit, search, specialty]);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

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

    const slot = selectedDoctor.availability?.data?.find(
      (slot) => slot.dayOfWeek === dayName
    );
    if (!slot) {
      showToast("Doctor is not available on this day", "info");
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
    if (!canProceed || !selectedDoctor) {
      showToast(
        "A date and time must be selected to continue with the appointment.", "info"
      );
      return;
    }

    const [time, period] = typeTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);

    const localISOString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00`;
    setData({
      ...data,
      doctorId: selectedDoctor?.id,
      scheduledDate: localISOString,
    });

    nextStep();
  };

  const handleSpecialtySelect = (value: string) => {
    setSpecialty(value);
    setPage(1);
    if (window.innerWidth < 768) setShowSpecialtyList(false); // Hide sidebar on mobile
  };


  return (
    <div>
      {!selectedDoctor ? (
        <section className="mt-4">

         <button
              onClick={prevStep}
              className="text-primary cursor-pointer"
            >
             ← Back
            </button>
          <h5 className="mb-4 text-lg">Available Doctors</h5>

          {/* Search and Filter Controls */}
          {data?.type === "A Specialist" && (
            <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/2">
                <FiSearch className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-10 py-3 w-full focus:outline-primary"
                />
              </div>

              <button
                onClick={() => setShowSpecialtyList(!showSpecialtyList)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md"
              >
                <HiOutlineFilter /> Filter Specialties
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Specialties Sidebar */}
            {data?.type === "A Specialist" && (
              <div
                className={`${
                  showSpecialtyList ? "block" : "hidden"
                } md:block flex-col gap-4 mb-4`}
              >
                <div className="flex flex-col gap-2 w-full items-start">
                  <div className="w-full p-4  rounded-md bg-gray-100 md:bg-white">
                    <h5 className="text-xl font-bold">Specialties</h5>
                  </div>

                  <div
                    className={`w-full p-2 hover:bg-primary rounded-md hover:text-white cursor-pointer ${
                      specialty === "" && "bg-primary text-white"
                    }`}
                    onClick={() => handleSpecialtySelect("")}
                  >
                    <h1 className="mx-2">All</h1>
                  </div>

                  {adminDoctorSpecialties.map((spec) => (
                    <div
                      key={spec}
                      className={`w-full p-2 hover:bg-primary rounded-md hover:text-white cursor-pointer ${
                        specialty.toLowerCase() === spec.toLowerCase() &&
                        "bg-primary text-white"
                      }`}
                      onClick={() => handleSpecialtySelect(spec)}
                    >
                      <h1 className="mx-2">{spec}</h1>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Doctors Grid */}
            <div
              className={`${
                data?.type === "A Specialist"
                  ? "md:col-span-3"
                  : "md:col-span-4"
              }`}
            >
              {loading ? (
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 ${
                    data?.type === "A Specialist"
                      ? "lg:grid-cols-3 mt-8"
                      : "lg:grid-cols-4"
                  } gap-6 mt-4`}
                >
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white rounded-xl shadow-sm animate-pulse space-y-4"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto" />
                      <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                      <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 ${
                      data?.type === "A Specialist"
                        ? "lg:grid-cols-3 mt-8"
                        : "lg:grid-cols-4"
                    } gap-6`}
                  >
                    {doctors.length === 0 ? (
                      <div
                        className={`h-[500px] flex flex-col items-center justify-center ${
                          data?.type === "A Specialist"
                            ? "lg:col-span-3 mt-8"
                            : "lg:col-span-4"
                        }`}
                      >
                        <p>No Available doctor</p>
                      </div>
                    ) : (
                      doctors.map((doctor) => (
                        <DoctorCard
                          key={doctor.id}
                          doctor={doctor}
                          handleClick={() => {
                            handleDoctorSelect(doctor);
                          }}
                        />
                      ))
                    )}
                  </div>

                  {totalPages > 1 && (
                    <PaginationComponent
                      page={page}
                      total={total}
                      limit={limit}
                      totalPages={totalPages}
                      onPageChange={(newPage: number) => setPage(newPage)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <main className="mt-4 max-w-2xl mx-auto">
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
                  Dr {selectedDoctor.user.firstName}{" "}
                  {selectedDoctor.user.lastName}
                </h5>
                <p className="text-sm text-gray-500">
                  {selectedDoctor.specialty}
                </p>
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
            <div className="space-y-3 my-8">
              {selectedDoctor?.availability?.data?.length ? (
                selectedDoctor.availability.data.map((slot, index) => (
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
              <p className="text-sm text-gray-500">
                No available times for selected date.
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleNextStep}
              className={`form-primary-button my-4 ${
                canProceed ? "bg-primary" : "bg-primary cursor-not-allowed"
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
