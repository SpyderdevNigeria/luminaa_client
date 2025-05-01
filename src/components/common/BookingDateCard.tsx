import { useState } from "react";
import CustomCalendar from "./CustomCalendar";

function BookingDateCard({ type = "default" }) {
  const isSmall = type === "small";
  const [typeTime, setTypeTime] = useState(null);

  const AppointmentTime = [
    { id: 1, name: "9:00 AM" },
    { id: 2, name: "10:00 AM" },
    { id: 3, name: "11:00 AM" },
    { id: 4, name: "12:00 PM" },
    { id: 5, name: "1:00 PM" },
    { id: 6, name: "2:00 PM" },
  ];

  return (
    <section>
      {/* Consultation Location Dropdown */}
      <main className={`max-w-2xl w-full mx-auto ${isSmall ? "my-3" : "my-8"
        }`}>
        <div>
          <label
            htmlFor="maritalStatus"
            className={`block font-[500] leading-6  text-primary ${isSmall ? "text-[12px]" : "text-xs md:text-lg mb-2"
              }`}
          >
            Consultation Location
          </label>
          <select
            name="maritalStatus"
            id="maritalStatus"
            className={`w-full rounded-lg font-[300] border focus:outline-primary text-gray-light ${isSmall ? "p-1 text-[9px]" : "p-3 text-xs md:text-sm"
              }`}
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </main>

      {/* Calendar and Time Selection */}
      <main
        className={`max-w-2xl w-full mx-auto rounded-lg border border-gray-light ${isSmall ? "p-2" : "p-4"
          }`}
      >
        <section>
          <h3 className={`${isSmall ? "text-[14px]" : "text-sm md:text-base"} font-[500] mb-4`}>
            Select a Date For your appointment
          </h3>
          <div className="mt-4">
            <CustomCalendar />
          </div>
        </section>

        <section>
          <h3 className={`${isSmall ? "text-[14px]" : "text-sm md:text-base"} font-[500] my-4`}>
            Select Time
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {AppointmentTime.map((e) => (
              <button
                key={e.id}
                className={`rounded-sm font-[500] border ${isSmall ? "text-[11px] p-1.5" : "text-sm p-2"
                  } ${typeTime === e.id
                    ? "border-primary bg-primary text-white"
                    : "border-gray-light"
                  }`}
                onClick={() => setTypeTime(e?.id)}
              >
                {e.name}
              </button>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}

export default BookingDateCard;
