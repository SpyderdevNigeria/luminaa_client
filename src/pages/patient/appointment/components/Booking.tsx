import { useState } from "react";
import BookingCard from "../../../../components/common/BookingCard";
import CustomCalendar from "../../../../components/common/CustomCalendar";
function Booking({ handleStep =()=>{} }) {
  const [typeTime, setTypeTime] = useState("");
  const AppointmentTime = [
    {
      name: "08 - 09 AM",
      id: "08 - 09 AM",
    },
    {
      name: "10 - 11 AM",
      id: "10 - 11 AM",
    },
    {
      name: "11 - 12 PM",
      id: "11 - 12 PM",
    },
    {
      name: "12 - 01 PM",
      id: "12 - 01 PM",
    },
    {
      name: "01 - 02 PM",
      id: "01 - 02 PM",
    },
    {
      name: "03 - 04 PM",
      id: "03 - 04 PM",
    },
    {
      name: "04 - 05 PM",
      id: "04 - 05 PM",
    },
  ];
  return (
    <div>
   <BookingCard title={"Book an Appointment"}/>

      <main className="max-w-2xl w-full mx-auto my-8">
        <div className="">
          <label
            htmlFor="maritalStatus"
            className="block  text-xs md:text-lg font-[500] leading-6 mb-2 text-primary"
          >
            Consultation Location
          </label>
          <select
            name="maritalStatus"
            id="maritalStatus"
            className=" w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </main>

      <main className="max-w-2xl w-full mx-auto p-2 md:p-4 rounded-lg border border-gray-light">
        <section>
          <h3 className="text-sm md:text-base font-[500] mb-4">
            Select a Date For your appointment
          </h3>
          <div className="mt-4">
            <CustomCalendar />
          </div>
        </section>

        <section>
          <h3 className="text-sm md:text-base font-[500] my-4">Select Time</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 ">
            {AppointmentTime?.map((e) => (
              <button
                className={`text-sm font-[500] border rounded-sm p-2 ${
                  typeTime == e?.id
                    ? "border-primary bg-primary text-white"
                    : "border-gray-light"
                }`}
                key={e?.id}
                onClick={() => {
                  setTypeTime(e?.id);
                }}
              >
                {e?.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      <main className="max-w-2xl w-full mx-auto p-2 md:py-4">
      <div className="">
            <label
              htmlFor="symptoms"
              className="block  text-xs md:text-lg font-[500] leading-6 mb-2 text-primary"
            >
              Symptoms
            </label>
            <textarea
              name="symptoms"
              id="symptoms"
              rows={6}
              placeholder="Please Specify"
              className=" w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
            ></textarea>
          </div>
      </main>


      <main className="max-w-2xl w-full mx-auto p-2 md:p-0">
        <div className="w-full ">
          <button
            className="cursor-pointer text-xs md:text-sm bg-primary text-white px-4  py-3 font-semibold w-full rounded-md  mt-4 "
            onClick={() => {
              handleStep();
            }}
          >
            {"Next"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Booking;
