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
              className="block  text-xs md:text-lg  leading-6 mb-2 text-primary"
            >
              Symptoms
            </label>
            <textarea
              name="symptoms"
              id="symptoms"
              rows={6}
              placeholder="Please Specify"
              className=" form-input focus:outline-primary text-gray-light"
            ></textarea>
          </div>
      </main>


      <main className="max-w-2xl w-full mx-auto p-2 md:p-0">
        <div className="w-full ">
          <button
            className="cursor-pointer form-primary-button bg-primary  mt-4 "
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
