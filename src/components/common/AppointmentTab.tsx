import { useState } from "react";
import Pagination from "./Pagination";
import AppointmentDetailsModal from "../modal/AppointmentDetailsModal";

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
      const dateObj = new Date(app.scheduledDate);
      const formattedDate = dateObj.toLocaleDateString();
      const formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return {
        ...app,
        date: formattedDate,
        time: formattedTime,
      };
    })
  );
};

const AppointmentTab = ({ appointmentsData }: { appointmentsData: any[] }) => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const transformedAppointments = transformAppointments(appointmentsData || []);

  const now = new Date();
  const upcomingAppointments = transformedAppointments.filter(
    (app) => new Date(app.scheduledDate) > now || app.stauts !== "completed"
  );
  const pastAppointments = transformedAppointments.filter(
    (app) => app.status === "completed"
  );
  const allAppointments = transformedAppointments;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(
    (activeTab === "all"
      ? allAppointments.length
      : activeTab === "upcoming"
      ? upcomingAppointments.length
      : pastAppointments.length) / itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const renderAppointments = (apps: any[], title: string) => {
    if (!apps.length) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xs md:text-sm font-[300] text-[#A39A9A] mb-4">{title}</h2>
        <div className="space-y-4">
          {apps.map((app, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 flex items-center justify-between border-l-4 ${app.bg} ${app.border}`}
            >
              <div>
                <h3 className="text-sm font-medium">DR {app?.doctor?.firstName} {app?.doctor?.lastName}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {app.date} | {app.time}
                </p>
              </div>
              <button
                className="bg-white p-1 md:p-4 rounded-lg text-xs font-medium text-gray-700"
                onClick={() => {
                  setData(app);
                  setModalOpen(true);
                }}
              >
                View details
              </button>
            </div>
          ))}
          <AppointmentDetailsModal
            data={data}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    );
  };

  const getPaginatedAppointments = () => {
    const apps =
      activeTab === "all"
        ? allAppointments
        : activeTab === "upcoming"
        ? upcomingAppointments
        : pastAppointments;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return apps.slice(start, end);
  };

  return (
    <div className="mt-6">
      {/* Tabs Header */}
      <div className="flex gap-8 font-medium mb-3 text-sm md:text-base">
        {["all", "upcoming", "past"].map((tab) => (
          <div
            key={tab}
            onClick={() => {
              setActiveTab(tab as "all" | "upcoming" | "past");
              setCurrentPage(1);
            }}
            className={`cursor-pointer ${
              activeTab === tab
                ? "text-secondary border-b-2 border-secondary"
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
          `${activeTab === "all"
            ? "All"
            : activeTab === "upcoming"
            ? "Upcoming"
            : "Completed"} Appointments`
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          pagination={{
            totalDocs:
              activeTab === "all"
                ? allAppointments.length
                : activeTab === "upcoming"
                ? upcomingAppointments.length
                : pastAppointments.length,
            totalPages,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages,
          }}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AppointmentTab;
