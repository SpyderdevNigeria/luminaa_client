import { useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { FaCalendarAlt } from "react-icons/fa";
import DoctorImage from "../../assets/images/doctor/doctor.png";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";
import routeLinks from "../../utils/routes";
import { getFormattedDateTime } from "../../utils/dashboardUtils";

const colors = [
  { bg: "bg-[#FFEBC6]", border: "border-l-[#F1C87E]" },
  { bg: "bg-[#DFF7D7]", border: "border-l-[#9DD999]" },
  { bg: "bg-[#FDE9F4]", border: "border-l-[#E8AFCB]" },
];

const assignRandomColor = (data: any[]) => {
  return data.map((item: any) => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    return { ...item, ...random };
  });
};

const transformAppointments = (data: any[]) => {
  return assignRandomColor(
    data.map((app) => {
      const { formattedDate, formattedTime } = getFormattedDateTime(app.scheduledDate);
      return {
        ...app,
        date: formattedDate,
        time: formattedTime,
      };
    })
  );
};

interface appointmentTabProps {
  appointmentsData: any;
  total?: number;
  totalPages?: number;
  setPage?: (page: number) => void;
  page: number;
  limit: number;
}

const AppointmentTab = ({
  appointmentsData,
  page,
  limit,
  total,
  totalPages,
  setPage,
}: appointmentTabProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "completed" | "past">("all");

  const transformedAppointments = transformAppointments(appointmentsData || []);
  const now = new Date();

  const upcomingAppointments = transformedAppointments.filter(
    (app) => new Date(app.scheduledDate) > now
  );

  const pastAppointments = transformedAppointments.filter(
    (app) => new Date(app.scheduledDate) <= now
  );

  const completedAppointments = transformedAppointments.filter(
    (app) => app.status?.toLowerCase() === "completed"
  );

  const allAppointments = transformedAppointments;

  const getPaginatedAppointments = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingAppointments;
      case "completed":
        return completedAppointments;
      case "past":
        return pastAppointments;
      default:
        return allAppointments;
    }
  };

  const renderAppointments = (apps: any[], title: string) => {
    if (!apps.length) {
      return <p className="text-center text-sm text-gray-400">{title} not found.</p>;
    }

    return (
      <div className="mb-6">
        <h2 className="text-xs md:text-sm font-light text-[#A39A9A] mb-4">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
          {apps.map((app, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm"
            >
              {/* Title & Doctor */}
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden ">
                  <img
                    src={DoctorImage}
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </div>
                with Dr. {app?.doctor?.firstName} {app?.doctor?.lastName}
              </div>

              {/* Location */}
              <div>
                <p className="mt-2 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
                  Meeting Venue
                </p>
                <p className="text-xs text-gray-800 mt-1">
                  <span className="flex items-center text-primary gap-2">
                    {app.location?.toLowerCase() === "online" ? <FaHospital /> : <HiOutlineStatusOnline />}
                    {app.location}
                  </span>
                </p>
              </div>

              {/* Date and Time */}
              <div className="mt-4 bg-[#F9FAFB] rounded-lg p-4 flex items-center space-x-3">
                <div className="bg-primary/10 text-primary p-2 rounded-full">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Date & Time
                  </p>
                  <p className="text-xs text-gray-800">
                    {app.date} • {app.time}
                  </p>
                </div>
              </div>

              {/* Symptoms */}
              <div className="my-4">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Symptoms
                </p>
                <p className="text-sm text-gray-800 line-clamp-2">
                  {app?.patientNote || "N/A"}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-5">
                <Link
                  to={routeLinks?.patient?.consultations + "/" + app.id}
                  className="mt-4 px-4 py-2 border border-primary text-primary text-sm rounded-md hover:bg-primary hover:text-white transition"
                >
                  Reschedule appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6">
      {/* Tabs Header */}
      <div className="flex gap-8 font-medium mb-3 text-sm md:text-base">
        {["all", "upcoming", "completed", "past"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`cursor-pointer ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-inactive"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderAppointments(
          getPaginatedAppointments(),
          `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments`
        )}
      </div>

      {/* Pagination */}
      <div>
        <PaginationComponent
          page={page}
          total={total ?? 0}
          limit={limit}
          totalPages={totalPages ?? 1}
          onPageChange={(e: number) => {
            if (setPage) setPage(e);
          }}
        />
      </div>
    </div>
  );
};

export default AppointmentTab;
