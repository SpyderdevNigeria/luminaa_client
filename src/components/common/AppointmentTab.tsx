import  { useState } from "react";
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

const rawAppointments = [
  { type: "upcoming", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "upcoming", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "upcoming", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "past", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "past", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "upcoming", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "past", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
  { type: "past", doctor: "DR Kenya", date: "Feb 14, 2025", time: "6:30AM" },
];

const itemsPerPage = 3;
const AppointmentTab = () => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const appointments = assignRandomColor(rawAppointments);

  const upcomingAppointments = appointments.filter((app) => app.type === "upcoming");
  const pastAppointments = appointments.filter((app) => app.type === "past");

  const allAppointments = [...upcomingAppointments, ...pastAppointments];

  const totalPages = Math.ceil(allAppointments.length / itemsPerPage);


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
                <h3 className="text-sm font-medium">{app.doctor}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {app.date} | {app.time}
                </p>
              </div>
              <button className="bg-white p-1 md:p-4 rounded-lg text-xs font-medium text-gray-700"
              onClick={() => {setData(app); setModalOpen(true)}}
              >
                View details
              </button>
            </div>
          ))}
          <AppointmentDetailsModal data={data} isModalOpen={isModalOpen} setModalOpen={(e)=>{setModalOpen(e)}} />
        </div>
      </div>
    );
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
        {activeTab === "all" ? (
          <>
            {/* {renderAppointments(
              paginatedAll.filter((app) => app.type === "upcoming"),
              "Upcoming Appointments"
            )}
            {renderAppointments(
              paginatedAll.filter((app) => app.type === "past"),
              "Past Appointments"
            )} */}

            {
                   renderAppointments(
                    (upcomingAppointments).slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ),
                    `${"upcoming"} Appointments`
                  )
            }

{
                   renderAppointments(
                    (pastAppointments).slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ),
                    `${"Past"} Appointments`
                  )
            }
          </>
        ) : (
          renderAppointments(
            (activeTab === "upcoming" ? upcomingAppointments : pastAppointments).slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            ),
            `${activeTab === "upcoming" ? "Upcoming" : "Past"} Appointments`
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          pagination={{
            totalDocs: activeTab === "all" ? allAppointments.length : (activeTab === "upcoming" ? upcomingAppointments.length : pastAppointments.length),
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


export default AppointmentTab