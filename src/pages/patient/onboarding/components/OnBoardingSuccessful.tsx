import { Link } from 'react-router-dom'
import Calendaricon from '../../../../assets/images/auth/calendar.webp'
import routeLinks from '../../../../utils/routes'
function OnBoardingSuccessful() {
  return (
    <div className='flex flex-col items-center justify-center gap-8 max-w-md px-8 mx-auto '>
        <img src={Calendaricon} alt="" className='w-[200px] ' />
        <div className='text-center'>
        <h2 className="text-2xl  font-semibold">Account creation successful</h2>
        <p className="text-text-secondary text-sm  font-[400] text-center mt-2 px-4">
        Hey there!  We've sent you an important link to validate your account. This link will help you complete the registration process and gain access to all the features we offer. Don't forget to check your spam folder just in case it ended up there!
            </p>
        </div>

            <div className="w-full flex flex-col text-center ">
          <Link
          to={routeLinks?.patient?.appointment}
            className=" form-primary-button bg-primary   "
          >
            Book a Consultation 
          </Link>
          <Link
          to={routeLinks?.patient?.dashboard}
            className=" text-base bg-primary-light text-primary px-4  py-3 font-semibold w-full rounded-md  mt-2 "
          >
            Proceed to dashboard
          </Link>
        </div>
    </div>
  )
}

export default OnBoardingSuccessful