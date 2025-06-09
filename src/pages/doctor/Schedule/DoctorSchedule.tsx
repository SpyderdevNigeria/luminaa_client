import { useEffect, useState } from 'react';
import DoctorApi from '../../../api/doctorApi';
const defaultTime = { from: '09:00', to: '17:00' };
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const times = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const suffix = i < 12 ? 'AM' : 'PM';
  return `${hour.toString().padStart(2, '0')}:00 ${suffix}`;
});

const convertTo24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
  if (modifier === 'AM' && hours === '12') hours = '00';

  return `${hours.padStart(2, '0')}:${minutes}`;
};

const convertTo12Hour = (time24h: string) => {
  let [hours, minutes] = time24h.split(':');
  const h = parseInt(hours);
  const suffix = h >= 12 ? 'PM' : 'AM';
  hours = `${h % 12 === 0 ? 12 : h % 12}`.padStart(2, '0');
  return `${hours}:${minutes} ${suffix}`;
};

const DoctorSchedule = () => {
  interface WorkingDay {
    active: boolean;
    from: string;
    to: string;
  }

  const [workingDays, setWorkingDays] = useState<Record<string, WorkingDay>>(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        active: false,
        from: convertTo12Hour(defaultTime.from),
        to: convertTo12Hour(defaultTime.to),
      };
      return acc;
    }, {} as Record<string, WorkingDay>)
  );

  // Load existing availability
  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const {data} = await DoctorApi.getAvailability();
        const formatted = { ...workingDays };

      if (data?.data) {
         data?.data.forEach((item: any) => {
          formatted[item.dayOfWeek] = {
            active: true,
            from: convertTo12Hour(item.startTime),
            to: convertTo12Hour(item.endTime),
          };
        });
      }

        setWorkingDays(formatted);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    };

    loadAvailability();
  }, []);

  const handleToggle = (day: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active,
      },
    }));
  };

  const handleTimeChange = (day: string, key: 'from' | 'to', value: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    const payload = daysOfWeek
      .filter((day) => workingDays[day].active)
      .map((day) => ({
        dayOfWeek: day,
        startTime: convertTo24Hour(workingDays[day].from),
        endTime: convertTo24Hour(workingDays[day].to),
        allDay: false,
      }));

    try {
      await DoctorApi.updateAvailability({ data: payload });
      alert('Schedule updated successfully!');
    } catch (error) {
      console.error('Failed to update availability:', error);
      alert('Something went wrong while saving schedule.');
    }
  };

  return (
    <div className="container-bd">
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
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary relative">
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
                  className="border border-dashboard-gray text-[#898989] !rounded-full px-3 py-1 text-sm focus:outline-none"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            ) : (
              <span className="text-sm text-gray-400">Not working on this day</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition"
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
};

export default DoctorSchedule;
