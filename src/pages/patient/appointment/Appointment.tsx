import { useState } from "react";
import { Link } from "react-router-dom";
import website from "../../../utils/website";
import Booking from "./components/Booking";
import BookingCondition from "./components/BookingCondition";
import BookingDetails from "./components/BookingDetails";
import routeLinks from "../../../utils/routes";
function Appointment() {
const [step, setStep] = useState(1)
  return (
    <div>
    <div className="p-4 md:p-8">
      <Link to={routeLinks?.patient?.appointment}>
        <img src={website?.logo} alt=""
        className="w-40 object-contain mx-auto md:mx-0"
        />
      </Link>
    </div>
    <div className="flex flex-col items-center justify-center  p-4 ">
        {step === 1 && <Booking handleStep={() => {setStep(2)}} />}
        {step === 2 && <BookingCondition handleStep={() => {setStep(3)}}/>}
        {step === 3 && <BookingDetails/>}
      </div>
    </div>
  )
}


export default Appointment;