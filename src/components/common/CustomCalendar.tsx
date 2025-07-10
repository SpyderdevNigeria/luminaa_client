import { useState } from "react";
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
  selected?: string;
  onChange?: (date: string) => void;
  isDateDisabled?: (date: Date) => boolean;
}

const CustomCalendar = ({ selected, onChange, isDateDisabled }: CustomCalendarProps) => {
  const today = new Date();
  const selectedDate = selected ? new Date(selected) : null;

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = generateDays(currentYear, currentMonth);

  const handleDateClick = (day: number | null) => {
    if (!day) return;

    const date = new Date(currentYear, currentMonth, day);
    const isValid =
      date >= new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (isValid && onChange) {
      onChange(date.toISOString());
    }
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
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

  return (
    <div className={`w-full mx-auto p-4 bg-white rounded-lg border ${selected !== "" ? 'border-dashboard-gray' : ''}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-xl font-bold">
          <MdOutlineKeyboardArrowLeft />
        </button>
        <div className="text-lg">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button onClick={nextMonth} className="text-xl">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>

      {/* Days of week */}
      <div className="w-full grid grid-cols-7 gap-2 text-center font-[400] text-[#141414] mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates grid */}
      <div className="w-full grid grid-cols-7 gap-2 text-center justify-center">
        {days.map((day, index) => {
          const date = day ? new Date(currentYear, currentMonth, day) : null;

          const todayClass = date && isToday(day!) ? "border border-primary" : "";

          const isSelected =
            selectedDate &&
            date &&
            selectedDate.toDateString() === date.toDateString();

          const selectedClass = isSelected ? "bg-primary text-white" : "";

          const isDisabled =
            !day ||
            isPastDate(day) ||
            (date && isDateDisabled?.(date));

          const disabledClass = isDisabled
            ? "text-gray-300 cursor-not-allowed"
            : "hover:bg-blue-100 cursor-pointer";

          return (
            <div
              key={index}
              className={`h-10 w-10 mx-auto flex items-center justify-center rounded-sm ${todayClass} ${selectedClass} ${disabledClass}`}
              onClick={() => {
                if (!isDisabled && day) {
                  handleDateClick(day);
                }
              }}
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
