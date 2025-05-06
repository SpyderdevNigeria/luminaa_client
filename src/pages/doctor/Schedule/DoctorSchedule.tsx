import { useState } from 'react';
const defaultTime = { from: '09:00 AM', to: '09:00 PM' };
const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const times = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const suffix = i < 12 ? 'AM' : 'PM';
  return `${hour.toString().padStart(2, '0')}:00 ${suffix}`;
});

const DoctorSchedule = () => {
  interface WorkingDay {
    active: boolean;
    from: string;
    to: string;
  }

  const [workingDays, setWorkingDays] = useState<Record<string, WorkingDay>>(
    daysOfWeek.reduce<Record<string, WorkingDay>>((acc, day) => {
      acc[day] = {
        active: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
        ...defaultTime,
      };
      return acc;
    }, {})
  );

  const handleToggle = (day: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active,
      },
    }));
  };

  const handleTimeChange = (day: string, key: string, value: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Choose how & when you work</h2>
      <div className="flex flex-col gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between border-b border-dashboard-gray p-4 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={workingDays[day].active}
                  onChange={() => handleToggle(day)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-500 relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
              </label>
              <span className={`text-base ${!workingDays[day].active ? 'text-gray-400' : ''}`}>{day}</span>
            </div>

            {workingDays[day].active ? (
              <div className="flex items-center gap-3">
                <select
                  value={workingDays[day].from}
                  onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                    className="border border-dashboard-gray text-[#898989] !rounded-full px-3 py-1 text-sm focus:outline-none"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <span className="text-sm text-[#898989]">to</span>
                <select
                  value={workingDays[day].to}
                  onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                  className="border  border-dashboard-gray  text-[#898989] !rounded-full px-3 py-1 text-sm focus:outline-none"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            ) : (
              <span className="text-sm text-gray-400 ">Not working on this day</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSchedule;