import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {IAppointment} from "../../types/Interfaces"


interface Props {
  appointments: IAppointment[];
  selectedDate: Date;
  link?:string
  onDateSelect: (date: Date) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-200 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-yellow-100 text-yellow-800",
};

const HeaderTab = ({
  title,
  dropdowns = [],
}: {
  title: string;
  dropdowns?: {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (val: string) => void;
  }[];
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex gap-3 flex-wrap">
        {dropdowns.map((dropdown, index) => (
          <div key={index} className="flex flex-col text-sm">
            {/* <label className="font-medium">{dropdown.label}</label> */}
            <select
              className="px-2 py-1 border border-gray-300 rounded"
              value={dropdown.value}
              onChange={(e) => dropdown.onChange(e.target.value)}
            >
              {dropdown.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppointmentCalendar = ({ appointments, selectedDate, onDateSelect, link }: Props) => {
  const navigate = useNavigate();
  const [filterMonth, setFilterMonth] = useState<number>(selectedDate.getMonth());
  const [filterYear, setFilterYear] = useState<number>(selectedDate.getFullYear());
  const [filterDay, setFilterDay] = useState<number | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    const prev = new Date(filterYear, filterMonth - 1);
    setFilterMonth(prev.getMonth());
    setFilterYear(prev.getFullYear());
  };

  const handleNextMonth = () => {
    const next = new Date(filterYear, filterMonth + 1);
    setFilterMonth(next.getMonth());
    setFilterYear(next.getFullYear());
  };

  const days = useMemo(() => {
    const firstDay = new Date(filterYear, filterMonth, 1).getDay();
    const totalDays = getDaysInMonth(filterYear, filterMonth);
    const blanks = Array(firstDay).fill(null);
    return [
      ...blanks,
      ...Array.from({ length: totalDays }, (_, i) => new Date(filterYear, filterMonth, i + 1)),
    ];
  }, [filterYear, filterMonth]);

  const appointmentsByDay = useMemo(() => {
    const map: { [key: string]: IAppointment[] } = {};
    for (const app of appointments) {
      const date = new Date(app.scheduledDate);
      const dateStr = date.toDateString();
      const dayOfWeek = date.getDay();

      const matchesMonth = date.getMonth() === filterMonth && date.getFullYear() === filterYear;
      const matchesDay = filterDay === null || dayOfWeek === filterDay;

      if (matchesMonth && matchesDay) {
        if (!map[dateStr]) map[dateStr] = [];
        map[dateStr].push(app);
      }
    }
    return map;
  }, [appointments, filterDay, filterMonth, filterYear]);

  return (
    <div className="w-full rounded-xl bg-white md:p-6  transition">
      {/* Header */}
      <HeaderTab
        title={'Calendar'}
        dropdowns={[
          {
            label: "Month",
            value: String(filterMonth),
            onChange: (val) => setFilterMonth(parseInt(val)),
            options: monthNames.map((name, i) => ({
              label: name,
              value: String(i),
            })),
          },
          {
            label: "Year",
            value: String(filterYear),
            onChange: (val) => setFilterYear(parseInt(val)),
            options: Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i;
              return { label: String(year), value: String(year) };
            }),
          },
          {
            label: "Day",
            value: filterDay !== null ? String(filterDay) : "",
            onChange: (val) => setFilterDay(val === "" ? null : parseInt(val)),
            options: [
              { label: "All", value: "" },
              ...["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => ({
                label: d,
                value: String(i),
              })),
            ],
          },
        ]}
      />

      {/* Controls */}
      <div className="flex justify-between my-3">
        <button onClick={handlePrevMonth} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          Previous
        </button>
        <div className="text-xl font-semibold">
        {monthNames[filterMonth]} {filterYear}
        </div>
        <button onClick={handleNextMonth} className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          Next
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-xs font-bold text-white py-2 uppercase mb-2 bg-primary">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 min-h-[600px]">
        {days.map((date, idx) =>
          date ? (
            <div
              key={idx}
              className={`p-2 rounded flex flex-col gap-2 shadow  cursor-pointer ${
                date.toDateString() === selectedDate.toDateString() ? "bg-blue-50" : ""
              }`}
              onClick={() => onDateSelect(date)}
            >
              <div className="text-sm font-semibold">{date.getDate()}</div>
              <div className="flex flex-col gap-1">
                {(appointmentsByDay[date.toDateString()] || []).map((app) => (
                  <div
                    key={app.id}
                    className={`text-xs rounded p-1 text-black truncate ${statusStyles[app.status ?? "scheduled"]}`}
                    title={`${app.title || `${app.patient.firstName} ${app.patient.lastName}`}\n${new Date(app.scheduledDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}\n${app.patientNote || "No notes"}\nStatus: ${app.status?.replace("_", " ") || "Scheduled"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`${link}/${app.id}`);
                    }}
                  >
                    {app.title || `${app.patient.firstName} ${app.patient.lastName}`}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
