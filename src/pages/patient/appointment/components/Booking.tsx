import BookingCard from "../../../../components/common/BookingCard";
import BookingDateCard from "../../../../components/common/BookingDateCard";
function Booking({ handleStep =()=>{} }) {
  return (
    <div>
   <BookingCard title={"Book an Appointment"}/>
 
    <BookingDateCard/>

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
