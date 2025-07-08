import { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import website from "../../../utils/website";
import Booking from "./components/Booking";
import BookingCondition from "./components/BookingCondition";
import routeLinks from "../../../utils/routes";
import useAuth from "../../../hooks/useAuth";
import { logout } from "../../../reducers/authSlice";
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { useAppDispatch } from "../../../hooks/reduxHooks";
function Appointment() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAuth();
  const dispatch = useAppDispatch();
  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.login);
    }
    if (userProfile && userProfile.user && userProfile.user.role !== 'patient') {
      dispatch(logout());
      navigate(routeLinks?.auth?.login);
    }
  }, [authLoading, userProfile, navigate, ]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  return (
    <div>
    <div className="p-4 md:p-8">
      <div className="flex flex-row items-center justify-between ">
           <Link to={routeLinks?.patient?.dashboard}>
        <img src={website?.logo} alt=""
         className={`object-contain mx-auto md:mx-0 ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`}
        />
      </Link>

      <Link to={routeLinks?.patient?.dashboard} className="text-primary hover:underline">
        Dashboard
      </Link>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center  p-4 ">
        {!userProfile?.medicalHistory  ? <BookingCondition userProfile={userProfile}/> : <Booking />} 
      </div>
    </div>
  )
}


export default Appointment;



