import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

interface CustomCalendarProps {
  handleSelectedDate?: (date: Date | null) => void;
}

const CustomCalendar = ({ handleSelectedDate }: CustomCalendarProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = generateDays(currentYear, currentMonth);

  const handleDateClick = (day: number | null) => {
    if (day) {
      const selected = new Date(currentYear, currentMonth, day);
      if (selected >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        setSelectedDate(selected);
      }
    }
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  useEffect(() => {
    if(handleSelectedDate) {
          handleSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg border ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-xl font-bold">
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="text-lg ">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button onClick={nextMonth} className="text-xl ">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 text-center font-[400] text-[#141414] mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, index) => {
          const todayClass = day && isToday(day)
            ? "border border-primary"
            : "";
          const selectedClass =
            selectedDate &&
              day === selectedDate.getDate() &&
              currentMonth === selectedDate.getMonth() &&
              currentYear === selectedDate.getFullYear()
              ? "bg-primary text-white"
              : "";
          const disabledClass = day && isPastDate(day)
            ? "text-gray-300 cursor-not-allowed"
            : "hover:bg-blue-100 cursor-pointer";

          return (
            <div
              key={index}
              className={`h-10 w-10 flex items-center justify-center rounded-sm ${todayClass} ${selectedClass} ${disabledClass}`}
              onClick={() => !isPastDate(day!) && handleDateClick(day)}
            >
              {day || ""}
            </div>
          );
        })}
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-4 text-center text-sm text-gray-700">
          Selected: {selectedDate.toDateString()}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
