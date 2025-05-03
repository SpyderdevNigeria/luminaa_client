import { RiLink } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
function BookingDetails() {
  return (
    <div className='w-full '>
        <main className='max-w-[500px] mx-4 md:mx-auto border border-gray-light rounded-lg  p-4 md:p-6 animate-fade-in'>
            <h5 className='text-xl md:text-2xl font-medium'>
                Booking Details
            </h5>
            <div className='my-4 border-t py-6 pb-4 border-gray-light'>
                    <h4 className='text-[#666666] text-base '>Consultation type</h4>
                <div className='flex flex-row items-center mt-2 justify-between'>
                    <h5 className='text-[#2A2A2A] text-base '>Generalist Doctor checkup</h5>
                    <h6 className='text-[#2A2A2A] text-base  flex flex-row gap-4'><span className='text-primary-green'>1x</span>  ₦ 100,004</h6>
                </div>
            </div>
            <div className='my-4 border-t py-6 pb-4 border-gray-light'>
                    <h4 className='text-[#666666] text-base '>Consultation center</h4>
                <div className='mt-3'>
                    <h5 className='text-[#2A2A2A] text-base '>Zoom meeting </h5>
                    <a  href="" className='text-primary text-sm font-[300] flex flex-row items-center gap-2'><RiLink /> Meeting Link</a>
                </div>
            </div>

            <div className='my-4 border-t py-6 pb-4 border-gray-light'>
            <h4 className='text-[#666666] text-base '>Date & Time</h4>
            <h6 className='text-[#2A2A2A] text-base  flex flex-row items-center gap-1 mt-2'><CiCalendar className='text-lg text-secondary'/>12:00 AM Sat, 05 April 2025</h6>
            <div className='flex flex-row items-center mt-4 justify-between'>
                    <h5 className='text-[#666666] text-base '>Health Risk assessment</h5>
                    <h6 className='text-primary text-base  '>Edit</h6>
                </div>
                <h5 className='text-[#2A2A2A] text-base  mt-2'>Zoom meeting </h5>
            </div>
            <div className='mt-4 border-t pt-6 pb-0 border-gray-light'>
            <div className='flex flex-row items-center mt-8 mb-4  justify-between'>
                    <h5 className=' text-xl '>Total Amount</h5>
                    <h6 className=' text-xl  '>₦ 100,004</h6>
                </div>

            <button
            className="cursor-pointer form-primary-button bg-primary  mt-4 "
          >
            {"Proceed to Pay"}
          </button>
            </div>
        </main>
    </div>
  )
}

export default BookingDetails